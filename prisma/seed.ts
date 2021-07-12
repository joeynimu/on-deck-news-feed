import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

import { announcements, projects, users, mapper } from "../data";

async function main() {
  await Promise.all(
    announcements.map(
      async ({ body, created_ts, fellowship, id, title, updated_ts }) =>
        await client.announcement.create({
          data: {
            body,
            created_ts,
            fellowship,
            id,
            title,
            updated_ts,
          },
        })
    )
  );

  await Promise.all(
    users.map(
      async ({
        updated_ts,
        id,
        name,
        fellowship,
        created_ts,
        bio,
        avatar_url,
      }) => {
        await client.user.create({
          data: {
            updated_ts,
            id,
            name,
            fellowship,
            created_ts,
            bio,
            avatar_url,
          },
        });
      }
    )
  );

  Promise.all(
    projects.map(
      async ({ created_ts, name, updated_ts, id, icon_url, description }) => {
        await client.project.create({
          data: {
            created_ts,
            name,
            updated_ts,
            id,
            icon_url,
            description,
          },
        });
      }
    )
  );

  await Promise.all(
    mapper.map(async ({ project_id, user_id }) => {
      await client.project.update({
        where: {
          id: project_id,
        },
        data: {
          users: {
            connect: {
              id: user_id,
            },
          },
        },
      });
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
