import handlebars from 'handlebars';
import fs from 'fs';

export interface IParseMailTemplate {
    file: string;
    variables: {
        [key: string]: string | number;
    };
}

export default class HandleBarsMailTemplate {
    public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}
