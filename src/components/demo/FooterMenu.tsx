export default function FooterMenu({ list }) {
  return (
    <ul className="flex w-full flex-col gap-10px ">
      {list ? (
        list.map((itemData, index) => (
          <li key={index}>
            <a
              href={itemData.url}
              target="_blank"
              className="text-amethyst transition-all duration-200 hover:text-pink"
            >
              {itemData.name}
            </a>
          </li>
        ))
      ) : (
        <li className="h-[20px]" />
      )}
    </ul>
  );
}
