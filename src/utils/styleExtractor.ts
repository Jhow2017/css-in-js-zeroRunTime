import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { CSSProperties } from 'react';

interface StyleProps extends CSSProperties {
    _hover?: CSSProperties;
    _focus?: CSSProperties;
    [key: string]: any;
}

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
        return new Map<string, StyleProps>();
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const classNames = new Map<string, StyleProps>();
    const regex = /\.([^{\s]+)\s*\{([^}]*)\}/g;
    let match;

    while ((match = regex.exec(fileContent)) !== null) {
        const className = match[1];
        const cssContent = match[2].split(';').reduce((acc, rule) => {
            const [key, value] = rule.split(':').map((item) => item.trim());
            if (key && value) {
                acc[key] = value;
            }
            return acc;
        }, {} as StyleProps);
        classNames.set(className, cssContent);
    }

    return classNames;
};

// Inicializar o conjunto de classes geradas com as classes existentes no arquivo
const existingClasses = readExistingClasses(cssPath);
existingClasses.forEach((props, className) => generatedClasses.add(className));

// Função para gerar o nome da classe
const generateClassName = (props: StyleProps) => {
    const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(props))
        .digest('hex');
    return `box-${hash}`;
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

// Função para criar classes CSS
export const createCssClass = (props: StyleProps) => {
    const cacheKey = JSON.stringify(props);
    const className = generateClassName(props);

    if (generatedClasses.has(className)) {
        return className;
    }

    const { _hover, _focus, ...restProps } = props;
    const css = convertPropsToCss(restProps);
    writeCssToFile(className, css);

    if (_hover) {
        const hoverCss = convertPropsToCss(_hover);
        writeCssToFile(`${className}:hover`, hoverCss);
    }

    if (_focus) {
        const focusCss = convertPropsToCss(_focus);
        writeCssToFile(`${className}:focus`, focusCss);
    }

    classCache.set(cacheKey, className);

    return className;
};
