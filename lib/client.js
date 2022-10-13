import  sanityClient  from "@sanity/client";
import  imageUrlBuilder  from "@sanity/image-url";

export const client = sanityClient({
  projectId: "sfow1l6l",
  dataset: "production",
  apiVersion: "2022-10-13", // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
