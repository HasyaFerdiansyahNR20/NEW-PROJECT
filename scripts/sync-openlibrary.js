const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvihwknmtrxteaglvvlf.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2aWh3a25tdHJ4dGVhZ2x2dmxmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTc0NTkxNSwiZXhwIjoyMTA3MzIxOTE1fQ.9jxrFCZ6kDO-blClCl1UkSu7RPShsrflRsSN8O1ixdI';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

const GENRES = [
  { id: 'genre-novel-fiksi', name: 'Novel Fiksi', slug: 'novel-fiksi' },
  { id: 'genre-komik-manga', name: 'Komik & Manga', slug: 'komik-manga' },
  { id: 'genre-fantasi', name: 'Fantasi & Sci-Fi', slug: 'fantasi-scifi' },
  { id: 'genre-romansa', name: 'Romansa', slug: 'romansa' },
  { id: 'genre-misteri', name: 'Misteri & Thriller', slug: 'misteri-thriller' },
  { id: 'genre-pengembangan-diri', name: 'Pengembangan Diri', slug: 'pengembangan-diri' }
];

const BOOKS = [
  // 1. Novel Fiksi (10 buku)
  {
    id: 'book-nf-01',
    genre_id: 'genre-novel-fiksi',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    price: 78000,
    rating: 5.0,
    stock: 50,
    description: 'Kisah monumental Minke, pribumi cerdas di era kolonial Hindia Belanda yang memperjuangkan martabat dan cintanya pada Annelies Mellema di tengah diskriminasi feodal dan kolonial.',
    cover_url: '/covers/book-nf-01.jpg'
  },
  {
    id: 'book-nf-02',
    genre_id: 'genre-novel-fiksi',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    price: 65000,
    rating: 4.9,
    stock: 65,
    description: 'Perjuangan sepuluh anak di Belitung bersama dua guru berhati mulia untuk menimba ilmu di sekolah yang hampir roboh, menyalakan lentera harapan dan persahabatan.',
    cover_url: '/covers/book-nf-02.jpg'
  },
  {
    id: 'book-nf-03',
    genre_id: 'genre-novel-fiksi',
    title: 'Cantik Itu Luka',
    author: 'Eka Kurniawan',
    price: 72000,
    rating: 4.8,
    stock: 40,
    description: 'Epik realisme magis tentang Dewi Ayu, pelacur legendaris di Halimunda, merangkum sejarah kelam perang, kutukan keluarga, dan pergulatan bangsa melalui satire tajam.',
    cover_url: '/covers/book-nf-03.jpg'
  },
  {
    id: 'book-nf-04',
    genre_id: 'genre-novel-fiksi',
    title: 'Negeri 5 Menara',
    author: 'A. Fuadi',
    price: 62000,
    rating: 4.8,
    stock: 55,
    description: "Mantra sakti 'Man Jadda Wajada' yang menyatukan enam santri Pondok Madani dalam meraih impian besar menginjakkan kaki di benua-benua impian dunia.",
    cover_url: '/covers/book-nf-04.jpg'
  },
  {
    id: 'book-nf-05',
    genre_id: 'genre-novel-fiksi',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 75000,
    rating: 4.9,
    stock: 45,
    description: 'Karya sastra abadi melalui sudut pandang Scout Finch saat ayahnya, Atticus Finch, memperjuangkan keadilan hukum bagi pria berkulit hitam di tengah prasangka rasial Maycomb.',
    cover_url: '/covers/book-nf-05.jpg'
  },
  {
    id: 'book-nf-06',
    genre_id: 'genre-novel-fiksi',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 69000,
    rating: 4.7,
    stock: 50,
    description: 'Gambaran memukau tentang kemewahan, ilusi kejayaan Jazz Age, dan obsesi tak berujung Jay Gatsby demi merebut kembali cinta masa lalunya, Daisy Buchanan.',
    cover_url: '/covers/book-nf-06.jpg'
  },
  {
    id: 'book-nf-07',
    genre_id: 'genre-novel-fiksi',
    title: '1984 (Nineteen Eighty-Four)',
    author: 'George Orwell',
    price: 68000,
    rating: 4.9,
    stock: 60,
    description: "Distopia mencekam tentang kekuasaan mutlak 'Big Brother', pengawasan massal tanpa henti, dan perjuangan Winston Smith mempertahankan kebenaran dan kemanusiaan.",
    cover_url: '/covers/book-nf-07.jpg'
  },
  {
    id: 'book-nf-08',
    genre_id: 'genre-novel-fiksi',
    title: 'Animal Farm',
    author: 'George Orwell',
    price: 55000,
    rating: 4.8,
    stock: 70,
    description: 'Fabel alegoris tajam tentang revolusi hewan peternakan Manor Farm yang menggulingkan majikan manusia, sebelum akhirnya terjerumus dalam tirani kepemimpinan babi.',
    cover_url: '/covers/book-nf-08.jpg'
  },
  {
    id: 'book-nf-09',
    genre_id: 'genre-novel-fiksi',
    title: 'The Catcher in the Rye',
    author: 'J. D. Salinger',
    price: 65000,
    rating: 4.6,
    stock: 40,
    description: 'Kisah ikonik Holden Caulfield mengarungi kegelisahan masa remaja, keterasingan, dan pencarian kepolosan di jalanan kota New York setelah dikeluarkan dari asrama.',
    cover_url: '/covers/book-nf-09.jpg'
  },
  {
    id: 'book-nf-10',
    genre_id: 'genre-novel-fiksi',
    title: 'Tenggelamnya Kapal Van der Wijck',
    author: 'Buya Hamka',
    price: 58000,
    rating: 4.9,
    stock: 50,
    description: 'Tragedi asmara mengharukan antara Zainuddin dan Hayati yang kandas akibat benturan adat istiadat kaku Minangkabau berlatar masa kolonialisme.',
    cover_url: '/covers/book-nf-10.jpg'
  },

  // 2. Komik & Manga (10 buku)
  {
    id: 'book-km-01',
    genre_id: 'genre-komik-manga',
    title: 'One Piece (Vol. 1)',
    author: 'Eiichiro Oda',
    price: 45000,
    rating: 5.0,
    stock: 85,
    description: "Awal mula petualangan Monkey D. Luffy yang bermimpi menjadi Raja Bajak Laut, berlayar mengarungi Grand Line demi menemukan harta karun legendaris 'One Piece'.",
    cover_url: '/covers/book-km-01.jpg'
  },
  {
    id: 'book-km-02',
    genre_id: 'genre-komik-manga',
    title: 'Naruto (Vol. 1)',
    author: 'Masashi Kishimoto',
    price: 45000,
    rating: 4.9,
    stock: 80,
    description: 'Perjalanan pantang menyerah anak yatim piatu berkekuatan siluman rubah ekor sembilan, Uzumaki Naruto, yang bertekad diakui desa dan menjadi Hokage terhebat.',
    cover_url: '/covers/book-km-02.jpg'
  },
  {
    id: 'book-km-03',
    genre_id: 'genre-komik-manga',
    title: 'Attack on Titan (Vol. 1)',
    author: 'Hajime Isayama',
    price: 48000,
    rating: 4.9,
    stock: 75,
    description: 'Umat manusia yang terkurung di balik tiga dinding raksasa dari ancaman Titan pemakan manusia menghadapi teror baru ketika Titan Kolosal menjebol Dinding Maria.',
    cover_url: '/covers/book-km-03.jpg'
  },
  {
    id: 'book-km-04',
    genre_id: 'genre-komik-manga',
    title: 'Detective Conan (Vol. 1)',
    author: 'Gosho Aoyama',
    price: 45000,
    rating: 4.9,
    stock: 70,
    description: 'Detektif SMA jenius Shinichi Kudo diracuni oleh organisasi jubah hitam misterius hingga tubuhnya menyusut menjadi anak SD bernama samaran Conan Edogawa.',
    cover_url: '/covers/book-km-04.jpg'
  },
  {
    id: 'book-km-05',
    genre_id: 'genre-komik-manga',
    title: 'Death Note (Vol. 1)',
    author: 'Tsugumi Ohba & Takeshi Obata',
    price: 48000,
    rating: 4.9,
    stock: 65,
    description: 'Siswa cerdas Light Yagami menemukan buku catatan dewa kematian Shinigami yang bisa membunuh siapa saja yang namanya ditulis, memicu perang pikiran melawan detektif legendaris L.',
    cover_url: '/covers/book-km-05.jpg'
  },
  {
    id: 'book-km-06',
    genre_id: 'genre-komik-manga',
    title: 'Dragon Ball (Vol. 1)',
    author: 'Akira Toriyama',
    price: 45000,
    rating: 4.9,
    stock: 80,
    description: 'Petualangan klasik Son Goku, bocah berekor monyet berhati polos pemilik tongkat ajaib, bersama Bulma mengumpulkan tujuh bola naga legendaris pengabul harapan.',
    cover_url: '/covers/book-km-06.jpg'
  },
  {
    id: 'book-km-07',
    genre_id: 'genre-komik-manga',
    title: 'Bleach (Vol. 1)',
    author: 'Tite Kubo',
    price: 45000,
    rating: 4.8,
    stock: 65,
    description: 'Ichigo Kurosaki, remaja yang mampu melihat arwah, tak sengaja menerima kekuatan Shinigami dari Rukia Kuchiki demi melindungi keluarganya dari serangan Hollow ganas.',
    cover_url: '/covers/book-km-07.jpg'
  },
  {
    id: 'book-km-08',
    genre_id: 'genre-komik-manga',
    title: 'Demon Slayer: Kimetsu no Yaiba (Vol. 1)',
    author: 'Koyoharu Gotouge',
    price: 48000,
    rating: 5.0,
    stock: 90,
    description: 'Tanjiro Kamado bergabung dengan Korps Pemburu Iblis untuk membalaskan dendam keluarganya dan mencari penawar agar adiknya Nezuko kembali menjadi manusia normal.',
    cover_url: '/covers/book-km-08.jpg'
  },
  {
    id: 'book-km-09',
    genre_id: 'genre-komik-manga',
    title: 'Fullmetal Alchemist (Vol. 1)',
    author: 'Hiromu Arakawa',
    price: 48000,
    rating: 4.9,
    stock: 70,
    description: 'Dua bersaudara alkemis Edward dan Alphonse Elric menempuh perjalanan berbahaya mencari Batu Bertuah demi mengembalikan raga mereka yang hilang akibat transmutasi terlarang.',
    cover_url: '/covers/book-km-09.jpg'
  },
  {
    id: 'book-km-10',
    genre_id: 'genre-komik-manga',
    title: 'Tokyo Ghoul (Vol. 1)',
    author: 'Sui Ishida',
    price: 48000,
    rating: 4.8,
    stock: 60,
    description: 'Ken Kaneki bertransformasi menjadi manusia setengah ghoul setelah operasi darurat, terperangkap di antara dunia manusia dan makhluk pemangsa daging di kota Tokyo.',
    cover_url: '/covers/book-km-10.jpg'
  },

  // 3. Fantasi & Sci-Fi (10 buku)
  {
    id: 'book-fs-01',
    genre_id: 'genre-fantasi',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J. K. Rowling',
    price: 89000,
    rating: 5.0,
    stock: 75,
    description: 'Bocah yatim piatu Harry Potter menemukan warisan sihirnya dan memulai pendidikan di Sekolah Sihir Hogwarts, mengungkap misteri Batu Bertuah yang diincar Voldemort.',
    cover_url: '/covers/book-fs-01.jpg'
  },
  {
    id: 'book-fs-02',
    genre_id: 'genre-fantasi',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    price: 85000,
    rating: 4.9,
    stock: 55,
    description: 'Bilbo Baggins ditarik dari kenyamanan liang hobbit-nya oleh penyihir Gandalf dan tiga belas kurcaci dalam ekspedisi merebut kembali Gunung Sunyi dari cengkeraman naga Smaug.',
    cover_url: '/covers/book-fs-02.jpg'
  },
  {
    id: 'book-fs-03',
    genre_id: 'genre-fantasi',
    title: 'The Fellowship of the Ring',
    author: 'J. R. R. Tolkien',
    price: 89000,
    rating: 5.0,
    stock: 60,
    description: 'Frodo Baggins mengemban takdir berat membawa Cincin Utama menuju kawah Gunung Doom demi menghancurkan kekuatan tiran Penguasa Kegelapan Sauron.',
    cover_url: '/covers/book-fs-03.jpg'
  },
  {
    id: 'book-fs-04',
    genre_id: 'genre-fantasi',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 92000,
    rating: 4.9,
    stock: 50,
    description: "Mahakarya fiksi ilmiah berlatar planet gurun Arrakis, mengisahkan intrik kekuasaan politik antargalaksi, perang memperebutkan rempah 'melange', dan takdir mesianik Paul Atreides.",
    cover_url: '/covers/book-fs-04.jpg'
  },
  {
    id: 'book-fs-05',
    genre_id: 'genre-fantasi',
    title: 'Percy Jackson: The Lightning Thief',
    author: 'Rick Riordan',
    price: 79000,
    rating: 4.8,
    stock: 65,
    description: 'Percy Jackson menyadari dirinya adalah anak setengah dewa dari Poseidon, dan dituduh mencuri petir azimat milik Zeus dalam petualangan mitologi Yunani modern.',
    cover_url: '/covers/book-fs-05.jpg'
  },
  {
    id: 'book-fs-06',
    genre_id: 'genre-fantasi',
    title: 'A Game of Thrones',
    author: 'George R. R. Martin',
    price: 95000,
    rating: 4.9,
    stock: 45,
    description: 'Buku pertama seri A Song of Ice and Fire; intrik politik berdarah, pengkhianatan, dan perang takhta memperebutkan Iron Throne di Westeros saat musim dingin abadi kian mendekat.',
    cover_url: '/covers/book-fs-06.jpg'
  },
  {
    id: 'book-fs-07',
    genre_id: 'genre-fantasi',
    title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
    author: 'C. S. Lewis',
    price: 75000,
    rating: 4.8,
    stock: 60,
    description: 'Empat bersaudara Pevensie melangkah melewati lemari pakaian ajaib menuju Narnia, negeri musim dingin abadi yang ditaklukkan Penyihir Putih dan menanti kembalinya Aslan.',
    cover_url: '/covers/book-fs-07.jpg'
  },
  {
    id: 'book-fs-08',
    genre_id: 'genre-fantasi',
    title: 'Foundation',
    author: 'Isaac Asimov',
    price: 82000,
    rating: 4.8,
    stock: 45,
    description: 'Melalui ilmu psikohistori, ilmuwan Hari Seldon meramalkan runtuhnya Kekaisaran Galaksi dan mendirikan Yayasan untuk memperpendek masa kegelapan peradaban manusia.',
    cover_url: '/covers/book-fs-08.jpg'
  },
  {
    id: 'book-fs-09',
    genre_id: 'genre-fantasi',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    price: 72000,
    rating: 4.7,
    stock: 50,
    description: "Masa depan distopia ketika membaca buku dianggap kejahatan dan tugas 'pemadam kebakaran' adalah membakar semua teks cetak demi menjaga keseragaman pikiran publik.",
    cover_url: '/covers/book-fs-09.jpg'
  },
  {
    id: 'book-fs-10',
    genre_id: 'genre-fantasi',
    title: "Ender's Game",
    author: 'Orson Scott Card',
    price: 78000,
    rating: 4.8,
    stock: 50,
    description: "Andrew 'Ender' Wiggin, bocah jenius taktik militer, dilatih dalam simulasi perang antariksa tanpa menyadari bahwa nasib peradaban manusia berada di tangannya.",
    cover_url: '/covers/book-fs-10.jpg'
  },

  // 4. Romansa (10 buku)
  {
    id: 'book-rm-01',
    genre_id: 'genre-romansa',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    price: 68000,
    rating: 4.9,
    stock: 60,
    description: 'Kisah cinta mengharukan antara Hazel Grace Lancaster dan Augustus Waters yang bertemu di kelompok pendukung penderita kanker, belajar merengkuh makna hidup dan keterbatasan waktu.',
    cover_url: '/covers/book-rm-01.jpg'
  },
  {
    id: 'book-rm-02',
    genre_id: 'genre-romansa',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 55000,
    rating: 4.9,
    stock: 65,
    description: 'Dinamika cerdas antara Elizabeth Bennet yang mandiri dan Mr. Darcy yang arogan, menyingkap prasangka kelas sosial dan esensi cinta sejati di Inggris abad ke-19.',
    cover_url: '/covers/book-rm-02.jpg'
  },
  {
    id: 'book-rm-03',
    genre_id: 'genre-romansa',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    price: 58000,
    rating: 4.7,
    stock: 40,
    description: 'Balas dendam dan gairah cinta membara nan destruktif antara Heathcliff dan Catherine Earnshaw di padang liar berangin Yorkshire.',
    cover_url: '/covers/book-rm-03.jpg'
  },
  {
    id: 'book-rm-04',
    genre_id: 'genre-romansa',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    price: 62000,
    rating: 4.8,
    stock: 45,
    description: 'Perjalanan emosional dan keteguhan moral seorang gadis yatim piatu yang menjadi guru privat di Thornfield Hall dan jatuh cinta pada tuannya yang misterius, Edward Rochester.',
    cover_url: '/covers/book-rm-04.jpg'
  },
  {
    id: 'book-rm-05',
    genre_id: 'genre-romansa',
    title: 'Me Before You',
    author: 'Jojo Moyes',
    price: 69000,
    rating: 4.8,
    stock: 55,
    description: 'Louisa Clark yang ceria menjadi pengasuh Will Traynor, pria kaya yang lumpuh pascakecelakaan; kisah menyentuh tentang cinta yang mengubah cara pandang hidup selamanya.',
    cover_url: '/covers/book-rm-05.jpg'
  },
  {
    id: 'book-rm-06',
    genre_id: 'genre-romansa',
    title: 'Emma',
    author: 'Jane Austen',
    price: 55000,
    rating: 4.7,
    stock: 50,
    description: 'Emma Woodhouse, gadis cerdas yang gemar menjodohkan orang lain, terjebak dalam kesalahpahaman hatinya sendiri sebelum menyadari cinta sejatinya di dekatnya.',
    cover_url: '/covers/book-rm-06.jpg'
  },
  {
    id: 'book-rm-07',
    genre_id: 'genre-romansa',
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    price: 49000,
    rating: 4.8,
    stock: 70,
    description: 'Drama romantika legendaris tentang dua sejoli dari keluarga yang berseteru di Verona, berkorban demi mempertahankan cinta mereka melampaui kebencian turun-temurun.',
    cover_url: '/covers/book-rm-07.jpg'
  },
  {
    id: 'book-rm-08',
    genre_id: 'genre-romansa',
    title: 'Sense and Sensibility',
    author: 'Jane Austen',
    price: 55000,
    rating: 4.7,
    stock: 45,
    description: 'Kontras kepribadian dua saudari Dashwood—Elinor yang rasional dan Marianne yang penuh emosi—dalam mengarungi patah hati dan menemukan kebahagiaan sejati.',
    cover_url: '/covers/book-rm-08.jpg'
  },
  {
    id: 'book-rm-09',
    genre_id: 'genre-romansa',
    title: 'Normal People',
    author: 'Sally Rooney',
    price: 72000,
    rating: 4.7,
    stock: 50,
    description: 'Hubungan rumit nan intim antara Marianne dan Connell yang melintasi masa sekolah hingga kuliah di Dublin, menyelami keintiman, kerapuhan, dan penerimaan diri.',
    cover_url: '/covers/book-rm-09.jpg'
  },
  {
    id: 'book-rm-10',
    genre_id: 'genre-romansa',
    title: 'Little Women',
    author: 'Louisa May Alcott',
    price: 59000,
    rating: 4.9,
    stock: 60,
    description: 'Dinamika kehangatan, cinta, dan impian empat saudari March (Meg, Jo, Beth, dan Amy) tumbuh dewasa di tengah masa Perang Saudara Amerika.',
    cover_url: '/covers/book-rm-10.jpg'
  },

  // 5. Misteri & Thriller (10 buku)
  {
    id: 'book-mt-01',
    genre_id: 'genre-misteri',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Sir Arthur Conan Doyle',
    price: 62000,
    rating: 4.9,
    stock: 65,
    description: 'Dua belas kasus detektif legendaris Sherlock Holmes bersama sahabatnya Dr. John Watson, menggunakan observasi tajam dan deduksi logis memecahkan teka-teki rumit London.',
    cover_url: '/covers/book-mt-01.jpg'
  },
  {
    id: 'book-mt-02',
    genre_id: 'genre-misteri',
    title: 'Murder on the Orient Express',
    author: 'Agatha Christie',
    price: 69000,
    rating: 4.9,
    stock: 60,
    description: 'Detektif Hercule Poirot terjebak di kereta mewah Orient Express yang tertimbun salju, berusaha memecahkan pembunuhan jutawan Amerika di antara belasan penumpang yang mencurigakan.',
    cover_url: '/covers/book-mt-02.jpg'
  },
  {
    id: 'book-mt-03',
    genre_id: 'genre-misteri',
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    price: 69000,
    rating: 5.0,
    stock: 65,
    description: 'Sepuluh orang asing diundang ke pulau terpencil Soldier Island, satu per satu tewas secara misterius mengikuti bait lagu anak-anak tanpa ada pelaku yang terlihat.',
    cover_url: '/covers/book-mt-03.jpg'
  },
  {
    id: 'book-mt-04',
    genre_id: 'genre-misteri',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    price: 79000,
    rating: 4.8,
    stock: 55,
    description: 'Ahli simbologi Robert Langdon mengungkap teka-teki pembunuhan kurator Museum Louvre yang menuntun pada rahasia terlarang Holy Grail dan persaudaraan rahasia Sion.',
    cover_url: '/covers/book-mt-04.jpg'
  },
  {
    id: 'book-mt-05',
    genre_id: 'genre-misteri',
    title: 'The Hound of the Baskervilles',
    author: 'Arthur Conan Doyle',
    price: 59000,
    rating: 4.8,
    stock: 50,
    description: 'Legenda anjing raksasa berkutuk yang menghantui rawa-rawa Dartmoor mengancam pewaris terakhir keluarga Baskerville, memicu penyelidikan intensif Holmes dan Watson.',
    cover_url: '/covers/book-mt-05.jpg'
  },
  {
    id: 'book-mt-06',
    genre_id: 'genre-misteri',
    title: 'Angels & Demons',
    author: 'Dan Brown',
    price: 75000,
    rating: 4.8,
    stock: 55,
    description: 'Pacuan waktu mendebarkan di Vatikan melawan komplotan rahasia Illuminati yang mencuri tabung antimateri berkekuatan bom nuklir jelang konklaf pemilihan Paus baru.',
    cover_url: '/covers/book-mt-06.jpg'
  },
  {
    id: 'book-mt-07',
    genre_id: 'genre-misteri',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    price: 72000,
    rating: 4.7,
    stock: 45,
    description: 'Lenyapnya Amy Dunne di hari ulang tahun pernikahan kelima menyeret suaminya Nick ke dalam sorotan media dan tuduhan pembunuhan di balik kebohongan psikologis yang manipulatif.',
    cover_url: '/covers/book-mt-07.jpg'
  },
  {
    id: 'book-mt-08',
    genre_id: 'genre-misteri',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    price: 78000,
    rating: 4.8,
    stock: 50,
    description: 'Jurnalis Mikael Blomkvist dan hacker eksentrik Lisbeth Salander menyelidiki hilangnya gadis pewaris dinasti Vanger empat puluh tahun lalu, membongkar skandal gelap keluarga kaya Swedia.',
    cover_url: '/covers/book-mt-08.jpg'
  },
  {
    id: 'book-mt-09',
    genre_id: 'genre-misteri',
    title: 'The Silence of the Lambs',
    author: 'Thomas Harris',
    price: 75000,
    rating: 4.9,
    stock: 50,
    description: "Agen muda FBI Clarice Starling meminta bantuan mantan psikiater kanibal Dr. Hannibal Lecter di penjara keamanan maksimum demi menangkap pembunuh berantai berjuluk 'Buffalo Bill'.",
    cover_url: '/covers/book-mt-09.jpg'
  },
  {
    id: 'book-mt-10',
    genre_id: 'genre-misteri',
    title: 'Shutter Island',
    author: 'Dennis Lehane',
    price: 69000,
    rating: 4.7,
    stock: 45,
    description: 'Marsekal AS Teddy Daniels menginvestigasi hilangnya pasien pembunuh dari rumah sakit jiwa berkeamanan tinggi di pulau terisolasi, mengungkap konspirasi dan trauma masa lalu.',
    cover_url: '/covers/book-mt-10.jpg'
  },

  // 6. Pengembangan Diri (10 buku)
  {
    id: 'book-pd-01',
    genre_id: 'genre-pengembangan-diri',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 88000,
    rating: 5.0,
    stock: 90,
    description: 'Kerangka kerja ilmiah terbukti tentang bagaimana perubahan kecil 1% setiap hari melalui pembentukan sistem dan identitas mampu menghasilkan transformasi hidup luar biasa.',
    cover_url: '/covers/book-pd-01.jpg'
  },
  {
    id: 'book-pd-02',
    genre_id: 'genre-pengembangan-diri',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 82000,
    rating: 4.9,
    stock: 85,
    description: '19 cerita menarik mengenai bagaimana perilaku, emosi, dan bias manusia menentukan keberhasilan finansial jauh lebih besar daripada sekadar rumus matematika atau kepintaran.',
    cover_url: '/covers/book-pd-02.jpg'
  },
  {
    id: 'book-pd-03',
    genre_id: 'genre-pengembangan-diri',
    title: 'Rich Dad, Poor Dad',
    author: 'Robert T. Kiyosaki',
    price: 75000,
    rating: 4.8,
    stock: 80,
    description: 'Pelajaran finansial fundamental membedakan aset dan liabilitas, literasi keuangan, dan pola pikir mandiri menuju kebebasan finansial dari dua sosok figur ayah.',
    cover_url: '/covers/book-pd-03.jpg'
  },
  {
    id: 'book-pd-04',
    genre_id: 'genre-pengembangan-diri',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    price: 65000,
    rating: 4.9,
    stock: 60,
    description: 'Catatan renungan pribadi Kaisar Romawi dan filsuf Stoa tentang disiplin diri, ketabahan mental dalam menghadapi kesulitan, serta integritas moral hidup selaras dengan alam.',
    cover_url: '/covers/book-pd-04.jpg'
  },
  {
    id: 'book-pd-05',
    genre_id: 'genre-pengembangan-diri',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    price: 85000,
    rating: 4.9,
    stock: 70,
    description: 'Pendekatan holistik dan terintegrasi berlandaskan etika karakter untuk memecahkan masalah pribadi dan profesional, mulai dari proaktif hingga terus mengasah kemampuan diri.',
    cover_url: '/covers/book-pd-05.jpg'
  },
  {
    id: 'book-pd-06',
    genre_id: 'genre-pengembangan-diri',
    title: 'Deep Work',
    author: 'Cal Newport',
    price: 79000,
    rating: 4.8,
    stock: 65,
    description: 'Panduan praktis menguasai kemampuan fokus tanpa distraksi pada tugas menuntut kognitif, sebuah keterampilan bernilai tinggi yang langka di dunia ekonomi modern.',
    cover_url: '/covers/book-pd-06.jpg'
  },
  {
    id: 'book-pd-07',
    genre_id: 'genre-pengembangan-diri',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 89000,
    rating: 4.9,
    stock: 55,
    description: 'Pemenang Nobel Ekonomi menyingkap dua sistem yang mengendalikan cara berpikir manusia: Sistem 1 yang cepat dan intuitif, serta Sistem 2 yang lambat dan logis.',
    cover_url: '/covers/book-pd-07.jpg'
  },
  {
    id: 'book-pd-08',
    genre_id: 'genre-pengembangan-diri',
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    price: 68000,
    rating: 5.0,
    stock: 60,
    description: 'Pengalaman bertahan hidup psikiater di kamp konsentrasi Auschwitz yang melahirkan logoterapi: keyakinan bahwa pendorong utama manusia adalah menemukan makna dalam penderitaan.',
    cover_url: '/covers/book-pd-08.jpg'
  },
  {
    id: 'book-pd-09',
    genre_id: 'genre-pengembangan-diri',
    title: 'Start with Why',
    author: 'Simon Sinek',
    price: 75000,
    rating: 4.8,
    stock: 65,
    description: 'Konsep Lingkaran Emas (Golden Circle) yang menjelaskan bagaimana para pemimpin dan inovator terhebat di dunia menginspirasi orang lain dengan memulai dari tujuan dan alasan fundamental.',
    cover_url: '/covers/book-pd-09.jpg'
  },
  {
    id: 'book-pd-10',
    genre_id: 'genre-pengembangan-diri',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: 79000,
    rating: 4.7,
    stock: 75,
    description: 'Pendekatan segar tanpa basa-basi tentang menerima keterbatasan diri, memilih hal-hal yang benar-benar bernilai untuk diperjuangkan, dan melepaskan standar kesempurnaan semu.',
    cover_url: '/covers/book-pd-10.jpg'
  }
];

async function syncCatalog() {
  console.log(`Starting Open Library catalog sync to Supabase...`);
  console.log(`Total genres: ${GENRES.length}`);
  console.log(`Total books: ${BOOKS.length}`);

  // 1. Ensure genres exist
  console.log('\nUpserting genres...');
  const { error: genreErr } = await supabase
    .from('genres')
    .upsert(GENRES, { onConflict: 'id' });

  if (genreErr) {
    console.error('Error upserting genres:', genreErr.message);
    process.exit(1);
  }
  console.log('Genres successfully upserted.');

  // 2. Clear old books (book-001..book-008) so only the 60 official Open Library books exist
  console.log('\nCleaning up old sample books...');
  const oldIds = ['book-001', 'book-002', 'book-003', 'book-004', 'book-005', 'book-006', 'book-007', 'book-008'];
  const { error: delErr } = await supabase
    .from('books')
    .delete()
    .in('id', oldIds);

  if (delErr) {
    console.warn('Note on deleting old books:', delErr.message);
  }

  // 3. Upsert 60 books
  console.log('\nUpserting 60 Open Library books (10 per genre)...');
  const { data: upserted, error: bookErr } = await supabase
    .from('books')
    .upsert(BOOKS, { onConflict: 'id' })
    .select('id, genre_id, title');

  if (bookErr) {
    console.error('Error upserting books:', bookErr.message);
    process.exit(1);
  }

  console.log(`Successfully upserted ${upserted?.length || BOOKS.length} books into Supabase!`);

  // 4. Verify distribution per genre
  console.log('\nVerifying books per genre:');
  for (const g of GENRES) {
    const { count, error } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('genre_id', g.id);

    if (error) {
      console.error(`  Error counting for ${g.name}:`, error.message);
    } else {
      console.log(`  - ${g.name} (${g.slug}): ${count} buku`);
    }
  }

  console.log('\nSync finished successfully!');
}

syncCatalog().catch(err => {
  console.error('Fatal error during sync:', err);
  process.exit(1);
});
