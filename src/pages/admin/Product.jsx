import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../../api/productApi";

const Product = () => {
  const [todos, setTodos] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchTodos = async () => {
    try {
      const res = await getAllProduct({
        keyword,
        priority: priorityFilter,
        sortBy,
        order,
        page,
        limit,
      });
      setTodos(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách todo.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [keyword, priorityFilter, sortBy, order, page]);

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa todo này?")) {
      await deleteProduct(id);
      toast.success("Đã xoá todo thành công");
      fetchTodos();
    }
  };

  const handleToggleComplete = async (id) => {
    await updateProduct(id);
    toast.success("Cập nhật trạng thái thành công!");
    fetchTodos();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Danh sách Todo</h2>

      {/* Tìm kiếm + lọc */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tiêu đề..."
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">-- Lọc theo độ ưu tiên --</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => {
              const [s, o] = e.target.value.split("-");
              setSortBy(s);
              setOrder(o);
            }}
          >
            <option value="">-- Sắp xếp --</option>
            <option value="title-asc">Tiêu đề A-Z</option>
            <option value="title-desc">Tiêu đề Z-A</option>
            <option value="createdAt-desc">Mới nhất</option>
            <option value="createdAt-asc">Cũ nhất</option>
            <option value="priority-asc">Ưu tiên thấp → cao</option>
            <option value="priority-desc">Ưu tiên cao → thấp</option>
          </select>
        </div>
      </div>

      {/* Danh sách todo */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ưu tiên</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.priority}</td>
                <td>
                  {todo.completed ? (
                    <span className="text-success">Đã hoàn thành</span>
                  ) : (
                    <span className="text-warning">Chưa hoàn thành</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-1"
                    onClick={() => handleToggleComplete(todo.id)}
                  >
                    Đổi trạng thái
                  </button>
                  <Link
                    to={`/product/${todo.id}`}
                    className="btn btn-sm btn-secondary me-1"
                  >
                    Chi tiết
                  </Link>
                  <Link
                    to={`edit/${todo.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    Sửa
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Không có todo nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="text-center">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Trang trước
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Product;
