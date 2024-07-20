import {defineField, defineType} from 'sanity'
import {categoryType} from './categoryType'

export const subcategoryType = defineType({
  name: 'subcategory',
  title: 'Subcategorías',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{type: categoryType.name}],
    }),
  ],
})
