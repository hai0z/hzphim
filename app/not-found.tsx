import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-black text-primary/70 select-none">
            404
          </div>
        </div>

        {/* Main Content Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-error/10 rounded-full">
                <AlertTriangle className="w-12 h-12 text-error" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Trang không tồn tại
            </h1>

            {/* Description */}
            <p className="text-base-content/70 mb-8">
              Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
              không khả dụng.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="/" className="btn btn-outline gap-2">
                <Home className="w-4 h-4" />
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-base-content/50">
          <p className="text-sm">
            Nếu bạn nghĩ đây là lỗi, vui lòng{" "}
            <Link href="/" className="link link-primary">
              liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
