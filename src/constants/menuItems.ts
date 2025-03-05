interface MenuItem {
  id: string
  name: string
  href: string
  icon: string
  badge?: string
}

export const orderMenuItems: MenuItem[] = [
  { id: 'orders', name: 'Tüm Siparişlerim', href: '/hesabim/siparisler', icon: 'mdi:shopping-outline' },
  { id: 'reviews', name: 'Değerlendirmelerim', href: '/hesabim/degerlendirmeler', icon: 'mdi:star-outline' },
  { id: 'messages', name: 'Satıcı Mesajlarım', href: '/hesabim/mesajlar', icon: 'mdi:message-outline', badge: '2' },
  { id: 'repurchase', name: 'Tekrar Satın Al', href: '/hesabim/tekrar-satin-al', icon: 'mdi:refresh' }
]

export const specialMenuItems: MenuItem[] = [
  { id: 'coupons', name: 'İndirim Kuponlarım', href: '/hesabim/kuponlar', icon: 'mdi:ticket-outline' },
  { id: 'viewed', name: 'Önceden Gezdiklerim', href: '/hesabim/gezdiklerim', icon: 'mdi:clock-outline' },
  { id: 'favorites', name: 'Takip Ettiğim Mağazalar', href: '/hesabim/favoriler', icon: 'mdi:heart-outline' }
]

export const serviceMenuItems: MenuItem[] = [
  { id: 'credits', name: 'Krediler', href: '/hesabim/krediler', icon: 'mdi:credit-card-outline', badge: '90 Faiz Fırsatı' },
  { id: 'installments', name: 'Şanslı Çekiliş', href: '/hesabim/taksitler', icon: 'mdi:star-outline', badge: 'YENİ' }
]

export const accountMenuItems: MenuItem[] = [
  { id: 'profile', name: 'Kullanıcı Bilgilerim', href: '/hesabim/kullanici-bilgileri', icon: 'mdi:account-outline' },
  { id: 'addresses', name: 'Adres Bilgilerim', href: '/hesabim/adres-bilgileri', icon: 'mdi:map-marker-outline' },
  { id: 'cards', name: 'Kayıtlı Kartlarım', href: '/hesabim/kartlar', icon: 'mdi:credit-card-outline' },
  { id: 'returns', name: 'Duyuru Tercihlerim', href: '/hesabim/duyurular', icon: 'mdi:bell-outline' },
] 