import { GraphQLScalarType } from "graphql";
import { ContextInterface } from "./context";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return new Date(value).toLocaleString();
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    allUsers: async (
      _: any,
      {
        take = 4,
        cursor,
        fellowship,
      }: { take: number; cursor: number; fellowship: string[] },
      context: ContextInterface
    ) => {
      const skip = 1;
      const count = await context.prisma.user.count({
        where: {
          fellowship: {
            in: fellowship,
          },
        },
      });

      if (cursor) {
        const users = await context.prisma.user.findMany({
          skip,
          take,
          cursor: {
            id: cursor,
          },
          where: {
            fellowship: {
              in: fellowship,
            },
          },
          orderBy: {
            created_ts: "desc",
          },
          include: {
            projects: true,
          },
        });
        return { users, count };
      }

      const users = await context.prisma.user.findMany({
        skip: 0,
        take,
        where: {
          fellowship: {
            in: fellowship,
          },
        },
        orderBy: {
          created_ts: "desc",
        },
        include: {
          projects: true,
        },
      });
      return { users, count };
    },
    allProjects: async (_: any, args: any, context: ContextInterface) => {
      const projects = await context.prisma.project.findMany({
        orderBy: {
          created_ts: "desc",
        },
        include: {
          users: true,
        },
      });
      return projects;
    },
    project: async (
      _: any,
      { id }: { id: number },
      context: ContextInterface
    ) => {
      const project = await context.prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          users: true,
        },
      });

      return project;
    },
    user: async (_: any, { id }: { id: number }, context: ContextInterface) => {
      const user = await context.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          projects: true,
        },
      });
      return user;
    },
    announcements: async (
      _: any,
      { fellowship }: { fellowship: "all" | "writers" | "founders"[] },
      context: ContextInterface
    ) => {
      const announcements = await context.prisma.announcement.findMany({
        where: {
          fellowship: {
            in: fellowship,
          },
        },
        orderBy: {
          created_ts: "desc",
        },
      });

      return announcements;
    },
  },
};

export default resolvers;
