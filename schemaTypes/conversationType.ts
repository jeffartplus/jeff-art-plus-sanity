import {defineField, defineType} from 'sanity'
import {artistType} from './artistType'

export const conversationType = defineType({
  name: 'conversation',
  title: 'Conversatorio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'internationalizedArrayString',
      title: 'Nombre',
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Descripción',
    }),
    defineField({
      name: 'date',
      title: 'Fecha programada',
      type: 'datetime',
    }),
    defineField({
      name: 'artists',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: artistType.name}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name.0.value',
      artistName: 'artists.0.name',
      artistLastName: 'artists.0.lastName',
    },
    prepare(selection) {
      const {name, artistName, artistLastName} = selection
      return {
        title: name,
        subtitle: `${artistName} ${artistLastName}`,
      }
    },
  },
})
