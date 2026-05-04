import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductListCard from "../../components/product-card/product-list-card";
import { useCategoryProducts } from "../../hooks/use-category-products";
import { useProductCategories } from "../../hooks/use-product-categories";

const ALL_CATEGORY = {
  slug: "all",
  name: "All Categories",
  url: "",
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY.slug);
  const categories = useProductCategories();
  const { products, total } = useCategoryProducts(activeCategory, 100);

  const options = [ALL_CATEGORY, ...categories];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveCategory(event.target.value);
  };

  return (
    <div className="p-3 d-flex flex-column gap-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="fw-bold fs-4">Products</div>
        <div className="d-flex align-items-center gap-2">
          <span className="small text-secondary-custom">Category</span>
          <div className="border rounded-3 bg-body-tertiary px-2 py-1">
            <select
              className="form-select form-select-sm border-0 bg-transparent shadow-none px-2"
              value={activeCategory}
              onChange={handleCategoryChange}
              aria-label="Filter products by category"
            >
              {options.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Row className="g-3">
        <Col xs={12} className="my-2">
          <ProductListCard products={products} total={total} pageSize={10} variant="products-page" />
        </Col>
      </Row>
    </div>
  );
}
