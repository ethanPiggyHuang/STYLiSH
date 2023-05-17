import './Category.css';

const Category = () => {
  const baseCategoryUrl = './products.html?category=';
  return (
    <div>
      <ul className="menu">
        <li className="menu-border" />
        <li className="menu-border" />
        <li className="menu-border" />
      </ul>
      <ul className="menu">
        <li className="menu-item-list">
          <a href={`${baseCategoryUrl}women`} className="women menu-item">
            女裝
          </a>
        </li>
        <li className="menu-item-list">
          <a href={`${baseCategoryUrl}men`} className="men menu-item">
            男裝
          </a>
        </li>
        <li className="menu-item-list">
          <a
            href={`${baseCategoryUrl}accessories`}
            className="accessories menu-item"
          >
            配件
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Category;
