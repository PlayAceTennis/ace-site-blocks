import { expect, test } from "bun:test";
import { BLOCK_REGISTRY, BlockSchema, createBlock } from "./block";
import { CourtAvailabilityPropsSchema, CoursesPropsSchema, PhotoAlbumPropsSchema } from "./blocks";

test("every registered block has valid defaults", () => {
  for (const type of Object.keys(BLOCK_REGISTRY) as (keyof typeof BLOCK_REGISTRY)[]) {
    expect(BlockSchema.safeParse(createBlock(type)).success).toBe(true);
  }
});
test("data queries are bounded and IDs validated", () => {
  const availability = createBlock("court_availability").props;
  expect(CourtAvailabilityPropsSchema.safeParse({ ...availability, days: 8 }).success).toBe(false);
  expect(CourtAvailabilityPropsSchema.safeParse({ ...availability, courtIds: ["invalid"] }).success).toBe(false);
  expect(CourtAvailabilityPropsSchema.safeParse({ ...availability, courtIds: Array(21).fill(crypto.randomUUID()) }).success).toBe(false);
  expect(CoursesPropsSchema.safeParse({ ...createBlock("courses").props, limit: 25 }).success).toBe(false);
  expect(PhotoAlbumPropsSchema.safeParse({ ...createBlock("photo_album").props, limit: 61 }).success).toBe(false);
  expect(PhotoAlbumPropsSchema.safeParse({ ...createBlock("photo_album").props, albumId: "" }).success).toBe(false);
});
