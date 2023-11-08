import Image from 'next/image';
import Link from "next/link";

export default function Home() {
  const CATEGORIES = ["Top Offers", "Mobiles & Tablets", "Electronics", "Applicances", "Fashion", "Beauty", "Furniture", "Home & Kitchen"];

  return (
    <main className="p-4">
      <div className="grid md:grid-cols-8">
        {CATEGORIES.map(category => (
          <Link href="#" key={category} className="category-card max-w-xs flex flex-col gap-2 justify-center items-center border-x p-2">
            <img src="" />
            <div className="">
              {category}
            </div>
          </Link>
        ))}
      </div>

      <div className="category-preview"></div>
    </main>
  )
}
