import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';



async function main() {
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany(); // Nueva línea para borrar colecciones previas

  const { categories, products, users, collections } = initialData;

  await prisma.user.createMany({ data: users });
  await prisma.country.createMany({ data: countries });

  const categoriesData = categories.map(name => ({ name }));
  await prisma.category.createMany({ data: categoriesData });

  const collectionsData = collections.map(name => ({ name }));
  await prisma.collection.createMany({ data: collectionsData });

  const categoriesDB = await prisma.category.findMany();
  const collectionsDB = await prisma.collection.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  const collectionsMap = collectionsDB.reduce((map, collection) => {
    map[collection.name.toLowerCase()] = collection.id;
    return map;
  }, {} as Record<string, string>);

  for (const product of products) {
    const { type, images, collection, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
        collectionId: collection ? collectionsMap[collection.toLowerCase()] : null
      }
    });

    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({ data: imagesData });
  }

  console.log('Seed ejecutado correctamente');
}










( () => {

  if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();