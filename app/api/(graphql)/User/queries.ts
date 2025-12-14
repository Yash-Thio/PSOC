import type { AuthorizedContext } from "@backend/lib/auth/context";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";

import { handleGetCurrentUser } from "./resolvers/get-current-user";
import { UserGQL } from "./type";

@Resolver()
export class UserQueryResolver {
  @Query(() => UserGQL, { nullable: true })
  async getCurrentUser(@Ctx() ctx: AuthorizedContext) {
    return handleGetCurrentUser(ctx);
  }
}
