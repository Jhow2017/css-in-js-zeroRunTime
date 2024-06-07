import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { CSSProperties, ElementType, ReactNode } from 'react';
import React from 'react';

const generatedClasses = new Set<string>();
const classCache = new Map<string, string>();
const cssPath = path.resolve(process.cwd(), 'styles/generated.css');

// Função para garantir que o diretório existe
const ensureDirectoryExistence = (filePath: string) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
    console.log(`Directory created: ${dirname}`);
};

// Função para ler classes existentes do arquivo
const readExistingClasses = (filePath: string) => {
    if (!fs.existsSync(filePath)) {
        return new Map<string, string>();
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const classNames = new Map<string, string>();
    const regex = /\.([^{\s]+)\s*\{([^}]*)\}/g;
    let match;

    while ((match = regex.exec(fileContent)) !== null) {
        const className = match[1];
        classNames.set(className, match[2]);
    }

    return classNames;
};

// Inicializar o conjunto de classes geradas com as classes existentes no arquivo
const existingClasses = readExistingClasses(cssPath);
existingClasses.forEach((_, className) => generatedClasses.add(className));

// Função para gerar o nome da classe
const generateClassName = (css: string) => {
    const hash = crypto.createHash('md5').update(css).digest('hex');
    return `sc-${hash}`;
};

// Função para converter propriedades para CSS
const convertPropsToCss = (props: CSSProperties) => {
    return Object.entries(props)
        .map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return '';
            }
            const kebabKey = key
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase();
            return `${kebabKey}: ${value};`;
        })
        .filter(Boolean)
        .join(' ');
};

// Função para escrever o CSS no arquivo
const writeCssToFile = (className: string, css: string) => {
    if (generatedClasses.has(className)) return;

    ensureDirectoryExistence(cssPath);
    const cssContent = `.${className} { ${css} }`;

    try {
        fs.appendFileSync(cssPath, cssContent + '\n');
        console.log(`CSS written to file: ${cssContent}`);
        generatedClasses.add(className);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to write CSS to file: ${error.message}`);
        } else {
            console.error('Failed to write CSS to file: unknown error');
        }
    }
};

// Função para filtrar propriedades que não devem ser passadas para o DOM
const filterProps = (props: any, filteredProps: string[]) => {
    const cleanProps: any = {};
    Object.keys(props).forEach((key) => {
        if (!filteredProps.includes(key)) {
            cleanProps[key] = props[key];
        }
    });
    return cleanProps;
};

// Função para processar condições e interpolações de CSS
export const css = (
    strings: TemplateStringsArray,
    ...interpolations: any[]
) => {
    return strings.reduce((acc, str, i) => {
        const interpolation = interpolations[i];
        const value =
            typeof interpolation === 'function'
                ? interpolation({})
                : interpolation;
        return acc + str + (value || '');
    }, '');
};

const styled = <T extends ElementType>(Component: T) => {
    return <P extends object>(
        strings: TemplateStringsArray,
        ...interpolations: Array<(props: P) => string | false | undefined>
    ) => {
        return (
            props: P & {
                as?: ElementType;
                className?: string;
                children?: ReactNode;
            }
        ) => {
            const {
                as: As = Component,
                className: propClassName,
                children,
                ...rest
            } = props;

            const cssString = strings.reduce((acc, str, i) => {
                const interpolation = interpolations[i];
                const value = interpolation
                    ? typeof interpolation === 'function'
                        ? interpolation(props)
                        : interpolation
                    : '';
                return acc + str + (value || '');
            }, '');

            const className = generateClassName(cssString);

            if (!generatedClasses.has(className)) {
                writeCssToFile(className, cssString);
            }

            const combinedClassName = propClassName
                ? `${propClassName} ${className}`
                : className;

            const filteredPropsList = Object.keys(props).filter(
                (key) => !key.startsWith('on') && key !== 'className'
            );
            const filteredProps = filterProps(rest, filteredPropsList);

            return React.createElement(
                As,
                { ...filteredProps, className: combinedClassName },
                children
            );
        };
    };
};

export default styled;
