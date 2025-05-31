import React from "react";
import Link from "next/link";
import {
  Film,
  Heart,
  History,
  Settings,
  Home,
  Search,
  Star,
  Play,
  Mail,
  Phone,
  MapPin,
  Share2,
  MessageCircle,
  Camera,
  Video,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Film className="w-6 h-6 text-primary-content" />
              </div>
              <span className="text-xl font-bold">HZPhim</span>
            </div>
            <p className="text-base-content/70 text-sm leading-relaxed">
              Nền tảng xem phim trực tuyến hàng đầu với kho phim đa dạng, chất
              lượng cao và trải nghiệm xem tuyệt vời.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
                title="Facebook"
              >
                <Share2 className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
                title="Twitter"
              >
                <MessageCircle className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
                title="Instagram"
              >
                <Camera className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
                title="YouTube"
              >
                <Video className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/phim-moi"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <Film className="w-4 h-4" />
                  Phim mới
                </Link>
              </li>
              <li>
                <Link
                  href="/the-loai"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <Star className="w-4 h-4" />
                  Thể loại
                </Link>
              </li>
              <li>
                <Link
                  href="/quoc-gia"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Quốc gia
                </Link>
              </li>
            </ul>
          </div>

          {/* User Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tính năng</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Yêu thích
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <History className="w-4 h-4" />
                  Lịch sử xem
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Cài đặt
                </Link>
              </li>
              <li>
                <Link
                  href="/continue-watching"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Tiếp tục xem
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-base-content/70">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@hzphim.com</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/70">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+84 123 456 789</span>
              </div>
              <div className="flex items-start gap-2 text-base-content/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="text-sm">
                  88/1 Giáp Nhị, Hoàng Mai
                  <br />
                  TP. Hà Nội, Việt Nam
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-base-content/60">
              © {currentYear} HZPhim. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms"
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="/support"
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                Hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
