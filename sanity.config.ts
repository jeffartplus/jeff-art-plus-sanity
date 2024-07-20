import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

export default defineConfig({
  name: 'default',
  title: 'Jeff Art Gallery',

  projectId: 'v7tveygz',
  dataset: 'production',

  plugins: [
    internationalizedArray({
      languages: [
        {id: 'es', title: 'Español'},
        {id: 'en', title: 'Ingles'},
      ],
      defaultLanguages: ['es'],
      fieldTypes: ['string'],
    }),
    structureTool({structure, defaultDocumentNode}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
