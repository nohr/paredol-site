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
      {products.map((product: any) => (
        <div className="card image-full mx-auto aspect-square w-full !rounded-xl shadow-xl md:h-96 md:w-96">
          <figure>
            <Image
              className="rounded-xl"
              src={product.cover}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </figure>
          <div className="card-body rounded-xl bg-white bg-opacity-50 p-2 dark:bg-black dark:bg-opacity-50">
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
