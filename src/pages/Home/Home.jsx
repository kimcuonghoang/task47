import React from "react";
// import useFetchCategories from "../../hooks/useFetchCategories";
import useQueryParams from "../../hooks/useQueryParams";
import useFetchListWithParams from "../../hooks/useFetchListWithParams";
import styles from "./home.module.css";
const Home = () => {
  // const [categories] = useFetchCategories();

  const [params, updateParams, resetParams] = useQueryParams({
    search: "",
    skip: 0,
    limit: 12,
    sortBy: "",
    order: "",
    page: 1,
    category: "",
  });

  const [products, loading, error] = useFetchListWithParams("products", params);
  console.log(products);
  const handlePage = (newPage) => {
    if (newPage < 1) return;
    updateParams({
      ...params,
      skip: (newPage - 1) * params.limit,
      page: newPage,
    });
  };

  const handleLimit = (newLimit) => {
    updateParams({ ...params, limit: newLimit, skip: 0, page: 1 });
  };

  const handleSort = (e) => {
    const [sortBy, order] = e.target.value.split("-");
    updateParams({
      ...params,
      sortBy,
      order,
      skip: 0,
      page: 1,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1>Danh sách sản phẩm</h1>
      <div>
        <input
          type="text"
          value={params.search}
          onChange={(e) =>
            updateParams({
              ...params,
              search: e.target.value,
              skip: 0,
              page: 1,
            })
          }
          placeholder="Tìm kiếm..."
        />

        <div>
          <span>Hiển thị</span>
          <select
            value={params.limit}
            onChange={(e) => handleLimit(Number(e.target.value))}
          >
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="194">all</option>
          </select>
          <span>sản phẩm</span>
        </div>

        <select
          value={`${params.sortBy}-${params.order}`}
          onChange={handleSort}
        >
          <option value="-">Sắp xếp</option>
          <option value="price-desc">Cao - Thấp</option>
          <option value="price-asc">Thấp - Cao</option>
          <option value="title-asc">A - Z</option>
          <option value="title-desc">Z - A</option>
        </select>
        {/* <select
          value={params.category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            updateParams({
              ...params,
              category: selectedCategory,
              search: "",
              page: 1,
              skip: 0,
            });
          }}
        >
          <option value="">Tất cả danh mục</option>
          {categories &&
            categories.map((cate) => {
              const categorySlug = typeof cate === "string" ? cate : cate.slug;
              const categoryName = typeof cate === "string" ? cate : cate.name;
              return (
                <option key={categorySlug} value={categorySlug}>
                  {categoryName}
                </option>
              );
            })}
        </select> */}
      </div>

      <div className={styles.product}>
        {products.map((item) => (
          <div key={item.id}>
            {/* <img src={item.description} alt="" /> */}
            <div>{item.title}</div>
            <div>{item.price} đ</div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => handlePage(params.page - 1)}>Preview</button>
        <span>{params.page}</span>
        <button onClick={() => handlePage(params.page + 1)}>Next</button>
      </div>
    </>
  );
};

export default Home;
