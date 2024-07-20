import type {StructureResolver} from 'sanity/structure'
import {TrolleyIcon, UsersIcon, CalendarIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Obras de artes disponibles')
        .schemaType('artWork')
        .icon(TrolleyIcon)
        .child(S.documentList().title('Obras de artes disponibles').filter('available == true')),
      S.listItem()
        .title('Proximas exposiciones')
        .schemaType('exhibition')
        .icon(CalendarIcon)
        .child(S.documentList().title('Proximas exposiciones').filter('start_date > now()')),
      S.listItem()
        .title('Proximos conversatorios')
        .schemaType('conversation')
        .icon(CalendarIcon)
        .child(S.documentList().title('Proximos conversatorios').filter('date > now()')),
      S.divider(),
      S.documentTypeListItem('artist').icon(UsersIcon),
      S.documentTypeListItem('artWork'),
      S.documentTypeListItem('exhibition').icon(CalendarIcon),
      S.documentTypeListItem('conversation').icon(CalendarIcon),
      S.divider(),
      S.documentTypeListItem('category'),
      S.documentTypeListItem('subcategory'),
    ])
//   S.list()
//     .id('root')
//     .items([S.documentTypeListItem('artist').icon(UsersIcon)])
