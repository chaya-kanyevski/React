import * as yup from 'yup';

export const recipeSchema = yup.object({
    title: yup.string()
        .when('$isSubmitted', {
            is: true,
            then: schema => schema
                .required('Recipe title is required')
                .min(2, 'Title must be at least 2 characters')
                .max(50, 'Title cannot exceed 50 characters'),
            otherwise: schema => schema.notRequired()
        }),
  
    description: yup.string()
        .when('$isSubmitted', {
            is: true,
            then: schema => schema
                .max(200, 'Description cannot exceed 200 characters'),
            otherwise: schema => schema.notRequired()
        }),
  
    ingredients: yup.array()
        .when('$isSubmitted', {
            is: true,
            then: schema => schema
                .of(yup.string().required('Each ingredient must be a non-empty string'))
                .required('Ingredients list is required')
                .min(1, 'At least one ingredient is required'),
            otherwise: schema => schema.notRequired()
        }),
  
    instructions: yup.string()
        .when('$isSubmitted', {
            is: true,
            then: schema => schema
                .required('Cooking instructions are required')
                .min(20, 'Instructions must be at least 20 characters'),
            otherwise: schema => schema.notRequired()
        })
}).defined();