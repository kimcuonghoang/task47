import api from "./index";

// Tạo mới todo (product)
export const createProduct = (data) => api.post("products", data);

// Lấy chi tiết todo (product)
export const getProductDetail = async (id) => {
  const res = await api.get(`products/${id}`);
  return res.data; // ✅ Trả về chỉ phần dữ liệu
};

// Cập nhật todo (product)
export const updateProduct = (id, data) => api.put(`products/${id}`, data); // ✅ Thứ tự đúng: id trước, data sau

// Xoá todo (product)
export const deleteProduct = (id) => api.delete(`products/${id}`);

// Lấy danh sách todo (product) với tìm kiếm, lọc, phân trang, sắp xếp
export const getAllProduct = ({
  keyword,
  priority,
  sortBy,
  order,
  page,
  limit,
}) => {
  let query = [];

  if (keyword) query.push(`q=${keyword}`);
  if (priority) query.push(`priority=${priority}`);
  if (sortBy) query.push(`_sort=${sortBy}`);
  if (order) query.push(`_order=${order}`);
  if (page) query.push(`_page=${page}`);
  if (limit) query.push(`_limit=${limit}`);

  const queryString = query.length ? `?${query.join("&")}` : "";

  return api.get(`products${queryString}`);
};
