import { Link } from "react-router-dom"
import Icon from "@/components/ui/Icon"
import useFooterQueries from "@/hooks/admin/footer/useFooterQueries"
import KlinikPutriLogo from '@/assets/logo/klinik-putri.png'

const Footer = () => {
  const { getById } = useFooterQueries()
  const data = getById.data || {}

  const formatPhone = (phone) => {
    if (!phone) return ""
    if (phone.startsWith("0")) {
      phone = "+62 " + phone.substring(1)
    }
    if (phone.startsWith("+62 ")) {
      const number = phone.slice(4)
      if (number.length === 10) {
        return "+62 " + number.slice(0, 3) + "-" + number.slice(3, 7) + "-" + number.slice(7)
      }
    }
    return phone
  }

  const cleanPhone = (phone) => {
    return phone?.replace(/\s|-/g, '') || ''
  }

  return (
    <footer className="capitalize bg-white">
      <section className="grid grid-cols-1 px-4 md:grid-cols-3 md:px-32 py-7">
        <article>
          <img src={KlinikPutriLogo} alt="Logo Klinik Putri" width={70} className="mb-7" />
          <p>{data.alamat || ""}</p>
        </article>
        <article>
          <h2 className="text-2xl font-bold text-primary mb-7">menu</h2>
          <div className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-primary transition">beranda</Link>
            <Link to="/jadwal-dokter" className="hover:text-primary transition">jadwal dokter</Link>
            <Link to="/hubungi" className="hover:text-primary transition">hubungi</Link>
          </div>
        </article>
        <article>
          <h2 className="text-2xl font-bold text-primary mb-7">hubungi kami</h2>
          <div className="flex flex-col space-y-4">
            <a
              href={`tel:${cleanPhone(data.telepon)}`}
              className="flex items-center gap-2 hover:text-primary transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="phone" />
              {formatPhone(data.telepon)}
            </a>
            <a
              href={`https://wa.me/${cleanPhone(data.whatsapp)}`}
              className="flex items-center gap-2 hover:text-primary transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              {formatPhone(data.whatsapp)}
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100090354922398&mibextid=rS40aB7S9Ucbxw6v"
              className="flex items-center gap-2 hover:text-primary transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="facebook" />
              Klinik Putri Wamena
            </a>
            <a
              href="https://www.instagram.com/klinikputriwamena/"
              className="flex items-center gap-2 hover:text-primary transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" />
              klinikputriwamena
            </a>
          </div>
        </article>
      </section>
      <section className="text-center py-7 border border-t-[#8E8E8E]">
        <p>© 2025 <b>Klinik Putri Wamena</b>. All rights reserved.</p>
      </section>
    </footer>
  )
}

export default Footer
