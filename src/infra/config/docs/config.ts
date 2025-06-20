import type { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  type SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import type { AppEnvironment } from '@/infra/config/cors';
import { EnvService } from '@/infra/env';

type GenerateSwaggerConfigInput = {
  apiPort: number;
  environment: AppEnvironment;
  jsonDocumentUrl: string;
  host?: string;
};

export enum SwaggerTags {
  PROGRAMS = 'Programs',
}

export const generateSwaggerConfig = (input: GenerateSwaggerConfigInput) => {
  const { apiPort, environment, jsonDocumentUrl, host = 'http://localhost' } = input;

  const API_NAME = 'TV Scheduler API';
  const API_DESCRIPTION = 'TV Scheduler API';
  const API_VERSION = '0.0.1';

  const serverUrl = `${host}:${apiPort}`;

  const documentation = new DocumentBuilder()
    .setTitle(API_NAME)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_VERSION)
    .addServer(serverUrl, environment, {
      [environment]: {
        default: true,
      },
    })
    .addBasicAuth()
    .setExternalDoc(API_NAME, `${serverUrl}${jsonDocumentUrl}`)
    .build();

  return documentation;
};

export function openApi(app: INestApplication) {
  const JSON_DOCUMENT_URL = '/docs/json';
  const DOCUMENTATION_PATH = 'docs';

  const config = generateSwaggerConfig({
    apiPort: app.get(EnvService).get('API_PORT'),
    environment: app.get(EnvService).get('NODE_ENV'),
    jsonDocumentUrl: JSON_DOCUMENT_URL,
  });

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: JSON_DOCUMENT_URL,
  };

  SwaggerModule.setup(DOCUMENTATION_PATH, app, document, customOptions);
}
