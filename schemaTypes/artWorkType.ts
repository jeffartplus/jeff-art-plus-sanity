import {defineField, defineType} from 'sanity'
import {artistType} from './artistType'

export const artWorkType = defineType({
  name: 'artWork',
  title: 'Obra de arte',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Descripción',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'available',
      type: 'boolean',
      title: 'Está disponible',
      initialValue: false,
    }),
    defineField({
      name: 'createdOn',
      type: 'date',
      title: 'Fecha de creación',
      validation: (rule) =>
        rule.required().error('Es necesario especificar cuando se creo esta obra'),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Categoría',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'subcategory',
      type: 'reference',
      title: 'Subcategoría',
      to: [{type: 'subcategory'}],
      options: {
        filter: ({document}) => {
          const id = document.category._ref
          return {
            filter: 'references($id)',
            params: {id},
          }
        },
      },
    }),
    defineField({
      name: 'authors',
      title: 'Autor/es',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: artistType.name}],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      validation: (rule) => rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      author0: 'authors.0.name',
      author1: 'authors.1.name',
      author2: 'authors.2.name',
    },
    prepare(selection) {
      const {name, author0, author1, author2} = selection
      const authors = [author0, author1, author2].filter(Boolean)
      return {
        title: name,
        subtitle: authors.join(', '),
      }
    },
  },
})
