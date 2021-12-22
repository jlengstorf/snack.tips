import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    {
      title: 'Place',
      name: 'place',
      type: 'document',
      fields: [
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'slug',
          name: 'slug',
          options: {
            source: (doc) => doc.name,
          },
        },
        {
          type: 'reference',
          name: 'city',
          to: [{ type: 'city' }],
        },
        {
          type: 'geopoint',
          name: 'location',
        },
        {
          type: 'string',
          name: 'address',
        },
        {
          type: 'url',
          name: 'url',
          title: 'Link to Google Maps',
        },
        {
          type: 'text',
          name: 'note',
          description: 'Why did this place make the list?',
        },
      ],
    },
    {
      title: 'City',
      name: 'city',
      type: 'document',
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          type: 'slug',
          name: 'slug',
          options: {
            source: (doc) => doc.name,
          },
        },
      ],
    },
  ]),
});
