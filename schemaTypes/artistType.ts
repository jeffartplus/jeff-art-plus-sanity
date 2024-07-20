import {defineField, defineType} from 'sanity'

export const artistType = defineType({
  name: 'artist',
  title: 'Artista',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      type: 'string',
      title: 'Apellidos',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Descripción',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isVisible',
      type: 'boolean',
      title: 'Visible',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-${doc.lastName}`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'reference',
      options: {
        filter: ({document}) => {
          const id = document._id.replace('drafts.', '')
          return {
            filter: 'references($id)',
            params: {id},
          }
        },
      },
      to: [{type: 'artWork'}],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      lastName: 'lastName',
    },
    prepare(selection) {
      const {name, lastName} = selection
      return {
        title: `${name} ${lastName}`,
      }
    },
  },
})
