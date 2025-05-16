import React from 'react';
import { Dumbbell, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 pt-16 pb-8 text-neutral-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center gap-2 text-red-500 mb-4">
              <Dumbbell size={24} />
              <span className="text-xl font-bold">FLEX GYM</span>
            </div>
            <p className="mb-6">
              Transforming lives through fitness since 2020. Our state-of-the-art facilities and expert trainers are committed to helping you achieve your fitness goals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#membership" className="hover:text-red-500 transition-colors">Membership Plans</a></li>
              <li><a href="#classes" className="hover:text-red-500 transition-colors">Class Schedule</a></li>
              <li><a href="#trainers" className="hover:text-red-500 transition-colors">Our Trainers</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Nutrition Plan</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Operating Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>6:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>6:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>7:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between mt-4">
                <span>Public Holidays:</span>
                <span>8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-red-500 mt-1 flex-shrink-0" />
                <span>123 Fitness Avenue, Andheri West, Mumbai 400053</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-red-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-red-500 flex-shrink-0" />
                <span>info@flexgym.com</span>
              </li>
            </ul>
            <a 
              href="#join-now"
              className="mt-6 inline-block bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-2 rounded-full font-bold"
            >
              JOIN NOW
            </a>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FLEX GYM. All Rights Reserved.</p>
          <p className="mt-2 text-neutral-500">Designed by Pratyush</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;