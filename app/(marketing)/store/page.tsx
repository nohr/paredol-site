export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "only-no-store",
  runtime = "nodejs",
  preferredRegion = "auto";

import { getStore } from "api";
import Image from "next/image";
import Script from "next/script";

// a function that grabs the store data from the database
export async function generateStaticParams() {
  const products = await getStore();
  return products.map((products: any) => ({
    lot: products.lot,
  }));
}
export default async function StorePage() {
  const products = await getStore();
  return (
    <>
      {products.map((product: any, index: number) => (
        <div
          className="flex w-full flex-col rounded-xl shadow-xl md:flex-row"
          key={index}
        >
          <div className="relative h-96 w-full">
            <Image
              className="rounded-xl "
              src={product.cover}
              alt={product.name}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col gap-y-2 rounded-xl bg-white bg-opacity-50 p-2 dark:bg-black dark:bg-opacity-50">
            <h2 className="card-title text-6xl font-thin">{product.name}</h2>
            <p>{product.tag}</p>
            <div className="card-actions justify-end">
              <a
                className="fill link !w-full justify-items-center"
                href={product.url}
              >
                Download
              </a>
            </div>
          </div>
        </div>
      ))}
      <Script src="https://gumroad.com/js/gumroad.js" />
    </>
  );
}
