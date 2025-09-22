export interface Destination {
  id: string;
  name: string;
  prompt: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'eiffel_tower',
    name: 'Tháp Eiffel, Paris',
    prompt: 'Một ngày nắng đẹp tại Tháp Eiffel ở Paris, Pháp.',
  },
  {
    id: 'machu_picchu',
    name: 'Machu Picchu, Peru',
    prompt: 'Thành phố cổ của người Inca, Machu Picchu ở Peru, với những ngọn núi mờ sương ở phía sau.',
  },
  {
    id: 'santorini',
    name: 'Santorini, Hy Lạp',
    prompt: 'Những tòa nhà màu trắng và xanh mang tính biểu tượng của Santorini, Hy Lạp, nhìn ra Biển Aegean lúc hoàng hôn.',
  },
  {
    id: 'kyoto_bamboo',
    name: 'Kyoto, Nhật Bản',
    prompt: 'Đi bộ qua Rừng tre Arashiyama thanh bình ở Kyoto, Nhật Bản.',
  },
  {
    id: 'times_square',
    name: 'Quảng trường Thời đại, New York',
    prompt: 'Những bảng quảng cáo đèn neon rực rỡ của Quảng trường Thời đại, Thành phố New York về đêm.',
  },
  {
    id: 'pyramids_giza',
    name: 'Kim tự tháp Giza, Ai Cập',
    prompt: 'Đứng trước Kim tự tháp Giza hùng vĩ ở Ai Cập dưới bầu trời trong xanh.',
  },
  {
    id: 'serengeti',
    name: 'Serengeti, Tanzania',
    prompt: 'Trên một chuyến safari ở Serengeti, Tanzania, với những cây keo và động vật hoang dã ở phía xa trong một buổi hoàng hôn vàng.',
  },
  {
    id: 'great_wall',
    name: 'Vạn Lý Trường Thành, Trung Quốc',
    prompt: 'Đi bộ dọc theo một đoạn Vạn Lý Trường Thành đẹp như tranh vẽ, miền núi của Trung Quốc.',
  },
  {
    id: 'northern_lights',
    name: 'Bắc Cực quang, Iceland',
    prompt: 'Ngắm nhìn Cực quang phương Bắc kỳ diệu nhảy múa trên bầu trời ở Iceland trên một khung cảnh tuyết phủ.'
  },
  {
    id: 'rio_de_janeiro',
    name: 'Rio de Janeiro, Brazil',
    prompt: 'Đứng trên đỉnh Núi Sugarloaf nhìn ra bãi biển Copacabana và tượng Chúa Cứu Thế ở Rio de Janeiro, Brazil.'
  },
  {
    id: 'petra_jordan',
    name: 'Petra, Jordan',
    prompt: 'Khám phá thành phố cổ Petra ở Jordan, với mặt tiền Al-Khazneh (Kho báu) được chạm khắc vào vách đá sa thạch.'
  },
  {
    id: 'ha_long_bay',
    name: 'Vịnh Hạ Long, Việt Nam',
    prompt: 'Đi thuyền qua làn nước màu ngọc lục bảo của Vịnh Hạ Long, Việt Nam, được bao quanh bởi những cột đá vôi cao chót vót.'
  },
  {
    id: 'banff_national_park',
    name: 'Vườn quốc gia Banff, Canada',
    prompt: 'Chiêm ngưỡng Hồ Moraine màu ngọc lam tuyệt đẹp được bao quanh bởi Dãy núi Rocky hùng vĩ trong Vườn quốc gia Banff, Canada.'
  },
  {
    id: 'venice_italy',
    name: 'Venice, Ý',
    prompt: 'Đi thuyền gondola lãng mạn qua các con kênh đẹp như tranh vẽ của Venice, Ý, với những cây cầu và kiến trúc lịch sử.'
  }
];