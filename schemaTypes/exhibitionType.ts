import {defineField, defineType} from 'sanity'
import {artistType} from './artistType'
import {artWorkType} from './artWorkType'

export const exhibitionType = defineType({
  name: 'exhibition',
  title: 'Exposición',
  type: 'document',
  fieldsets: [{name: 'dates', title: 'Fechas', options: {columns: 2}}],
  fields: [
    defineField({
      name: 'name',
      type: 'internationalizedArrayString',
      title: 'Nombre',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Descripción',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'start_date',
      title: 'Fecha de apertura',
      type: 'date',
      fieldset: 'dates',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'end_date',
      title: 'Fecha de cierre',
      type: 'date',
      fieldset: 'dates',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'artists',
      type: 'array',
      title: 'Artista/s',
      of: [
        {
          type: 'reference',
          to: [{type: artistType.name}],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'artWorks',
      type: 'array',
      title: 'Obras de arte',
      of: [
        {
          type: 'reference',
          to: [{type: artWorkType.name}],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'name.0.value',
      author0: 'authors.0.name',
      author1: 'authors.1.name',
      author2: 'authors.2.name',
    },
    prepare(selection) {
      const {title, author0, author1, author2} = selection
      const authors = [author0, author1, author2].filter(Boolean)
      return {
        title,
        subtitle: authors.join(', '),
      }
    },
  },
})
