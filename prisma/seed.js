const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const {
  businessType,
  businessScale,
  comments,
  captions,
} = require('./seedArr');

const prisma = new PrismaClient();

const seedInv = async () => {
  const typeInv = ['vc', 'angel'];
  const email = faker.internet.email();
  const password = await bcrypt.hash('123', 10);
  const role = 'investor';
  const username = faker.person.fullName();
  const location = faker.location.city();
  const type = typeInv[Math.floor(Math.random() * typeInv.length)];

  const createUser = await prisma.user.create({
    data: {
      email,
      password,
      role,
    },
  });

  const id = Number(createUser.id);
  if (id) {
    await prisma.investor.create({
      data: {
        user_id: id,
        username,
        location,
        type,
      },
    });
  }

  console.log('Investor successfully created...');
};

const seedUmkm = async () => {
  const email = faker.internet.email();
  const password = await bcrypt.hash('123', 10);
  const role = 'umkm';
  const umkm_name = faker.company.name();
  const owner_name = faker.person.fullName();
  const business_scale =
    businessScale[Math.floor(Math.random() * businessScale.length)];
  const business_type =
    businessType[Math.floor(Math.random() * businessType.length)];
  const employees_number = faker.number.int({ min: 5, max: 99 });
  const founded_year = faker.number.int({ min: 1998, max: 2024 });
  const location = faker.location.city();

  const createUser = await prisma.user.create({
    data: {
      email,
      password,
      role,
    },
  });

  const userId = createUser.id;
  await prisma.umkm.create({
    data: {
      user_id: userId,
      umkm_name,
      owner_name,
      business_scale,
      business_type,
      employees_number,
      founded_year,
      location,
    },
  });

  console.log('UMKM successfully created...');
};

const seedStoryUMKM = async () => {
  const umkmId = await prisma.umkm.findMany({
    select: {
      user_id: true,
    },
  });

  if (umkmId.length > 0) {
    const randomId = umkmId[Math.floor(Math.random() * umkmId.length)].user_id;
    const caption = faker.lorem.paragraph();
    await prisma.story.create({
      data: {
        umkm_id: randomId,
        caption,
      },
    });
  } else {
    console.log('No UMKM IDs found.');
  }

  console.log('Story UMKM successfully created...');
};

const seedLikeStory = async () => {
  const storyId = await prisma.story.findMany({ select: { id: true } });
  const invId = await prisma.investor.findMany({ select: { user_id: true } });

  if (storyId && invId) {
    const randomStoryId =
      storyId[Math.floor(Math.random() * storyId.length)].id;
    const randomInvId = invId[Math.floor(Math.random() * invId.length)].user_id;

    await prisma.likesStory.create({
      data: {
        story_id: randomStoryId,
        investor_id: randomInvId,
      },
    });
  } else {
    console.log('No UMKM IDs found.');
  }

  console.log('Likes Story UMKM successfully created...');
};

const seedCommentStory = async () => {
  const storyId = await prisma.story.findMany({ select: { id: true } });
  const invId = await prisma.investor.findMany({ select: { user_id: true } });

  if (storyId && invId) {
    const randomStoryId =
      storyId[Math.floor(Math.random() * storyId.length)].id;
    const randomInvId = invId[Math.floor(Math.random() * invId.length)].user_id;
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    await prisma.storyComments.create({
      data: {
        story_id: randomStoryId,
        investor_id: randomInvId,
        comment: randomComment,
      },
    });
  } else {
    console.log('No UMKM IDs found.');
  }

  console.log('Comments Story UMKM successfully created...');
};

const seedFund = async () => {
  const umkmId = await prisma.umkm.findMany({ select: { user_id: true } });
  if (umkmId) {
    const randomId = umkmId[Math.floor(Math.random() * umkmId.length)].user_id;
    const randomDesc = captions[Math.floor(Math.random() * captions.length)];
    const required_funds = faker.finance.amount({
      min: 1000000,
      max: 100000000,
      dec: 0,
    });
    await prisma.fundraising.create({
      data: {
        umkm_id: randomId,
        description: randomDesc,
        required_funds,
      },
    });
  } else {
    console.log('No UMKM IDs found.');
  }

  console.log('Fundraising UMKM successfully created...');
};

(async () => {
  //   for (let i = 0; i <= 5; i++) {
  //     await seedInv();
  //     await seedUmkm();
  //   }
  //   for (let i = 0; i <= 10; i++) {
  //     await seedStoryUMKM();
  //   }
  //   for (let i = 0; i <= 1000; i++) {
  //     await seedLikeStory();
  //   }
  //   for(let i = 0; i <= 50; i++) {
  //     await seedCommentStory()
  //   }
  // for (let i = 0; i <= 10; i++) {
  //     await seedFund()
  // }
})();
