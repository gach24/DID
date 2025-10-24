const initialStudents = [
  {
    id: "1",
    name: "Ana García López",
    email: "ana.garcia@escuela.com",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiXTLMVxb41bvHaOzQWCBGA3og-ka0eYAkQeOKjGVNNmT-bYvtxBkQg1jjGkbhX-nY8lcUikppFilnCUMXjZ8H_EAyzY8o4wVDFZD1P7jhYi-N7NSMHThOTZuQ0cd24wvF3mEYCTtAeBsDOdaF0XpPhRpn96eVbFSvh6cwTtbDWSZ-q0Xj2J9I1pQ0SJFsyuOqucBLSWv2FO3Nurcjv3sungpAjKpc0rdztRqYIK2XCX2D3Rbw-CzCz-DfBW5Gjh8txNz1preOOKs",
    attendance: [
      { date: "2025-01-15", status: "present" },
      { date: "2025-01-16", status: "present" },
      { date: "2025-01-17", status: "late" },
      { date: "2025-01-18", status: "present" },
    ]
  },
  {
    id: "2",
    name: "Carlos Rodríguez Pérez",
    email: "carlos.rodriguez@escuela.com",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2S3irfSARAYO859Q2Y9_q9nMlpcNEOw7fi9Bm-xtaT1po51yNQt66VHnO-meyIOKZtXGqNLYRMBW_o9Bqi54TaQjRMtf-7VIF5Jp91BvfO7HhplejnDKWj14Ib9FZUZJwKafZUhzQkaQC89fnTqvyVZQzedxDhgd6IoZHuPjjZ7IsT_o7lhENB0ARMJ-OwpLr9EnELo9xZxHBq25jr1gEtrj-zuD2yMJn1M-lzr3byfkSwyDu0_AGkFosImRxdZN3FUkpRJjtVBI",
    attendance: [
      { date: "2025-01-15", status: "present" },
      { date: "2025-01-16", status: "absent" },
      { date: "2025-01-17", status: "present" },
      { date: "2025-01-18", status: "late" },
    ]
  },
  {
    id: "3",
    name: "María Fernández Ruiz",
    email: "maria.fernandez@escuela.com",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm1Roj_rooiv13-pIAHD2aYirQ0W_tgKCoVwPVPy9pvCiTMhf-5zgsZql80VXw2_OFk0Vqn4Q6s58FMmpOZSug5zakh8iZ6lG-7pIyExLqj3ZHH5LPvZXPhOULwjKHmj5j9Kr0GCd0gRnM2rnIUyrLDha5WGlLv9DpJxoVnLthk4nItbfZaEh89KK2D8wAV1hTlASHog7ClngfS1vHPnycdbnrwzzHi_WqRl4VGJZ8GbZFe1hRaEj4Ui4aBwkNChEwIoK2YTxDErU",
    attendance: [
      { date: "2025-01-15", status: "present" },
      { date: "2025-01-16", status: "present" },
      { date: "2025-01-17", status: "present" },
      { date: "2025-01-18", status: "present" },
    ]
  },
  {
    id: "4",
    name: "David Martínez Sánchez",
    email: "david.martinez@escuela.com",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd4ucdwC-Op5P4DN8CePQGhuOEMIwgwECR7ax59S1LfOWGg774o1FlrY4RnYOuzXHkurC34_lw8vVCe9BzXIONEt1uuIqH6RQuNJvjsxMqRXerQyXpKD0Gir6BPceUSqGhjVUFst5ixh0TOTtixeFRrGGl66eTnL676zBYIt2PQ2nbIvnOno-VmzcuWNJY3SsTKdYPG6yHomaiLsFOcmyAKTI3jCvspYPnDz8hiT4Ixe4jRC3qfnuRX6nx0Iocnicks0KdbFr5r9U",
    attendance: [
      { date: "2025-01-15", status: "late" },
      { date: "2025-01-16", status: "present" },
      { date: "2025-01-17", status: "absent" },
      { date: "2025-01-18", status: "present" },
    ]
  },
  {
    id: "5",
    name: "Laura González Torres",
    email: "laura.gonzalez@escuela.com",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Mt6bw4TiOeGUbMXs-lNH5lQPcHnSOBwrBsIpATr8RsngEySDYTaUBVYdJ2GtOq05C5BfKvL0wrdUfNSD18G5YpNMCtwZ_p2agXjW2jKwG84e0mHOlFjyThKMFHkx1aK60QpKgQQ1_LR4toyj-Hl3VkOUlkdYy3vvywBhllNzpbMk6Bh7kROggavXF48ZSB_vz0tZ3DsuHENK4XWulMeHo2m6hdQJ2Fd2Jn7KUMDw6y1pED-fidzTBV8UKjHRkNHeLDYEIikdC9s",
    attendance: [
      { date: "2025-01-15", status: "present" },
      { date: "2025-01-16", status: "present" },
      { date: "2025-01-17", status: "present" },
      { date: "2025-01-18", status: "absent" },
    ]
  },
  {
    id: "6",
    name: "Pedro Jiménez Castro",
    email: "pedro.jimenez@escuela.com",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGZnHOlaTolgL-VFi-2T4eWTN3mtIYh7KQtseyB2Ul4tI_LVGuGCCdTj_3F6rg6q7g_yAUGtrO-u1yaf-XAxiq3wH4g46vHwdJ5ZZ3ifsSkaivopqVIkwQbIT0i1ye9ke89DTsPp9NlUT71UdIDjpc6ToKjJOyj49XcUOxbZR66y4LbbrdtGlUzCQfUEzp7YEGuYRgI8AOsCTqwJkGa5pWa5feL3c95wxsDMtW9jWTIThhC7nvt_Hd2YkTHdI6oYnC__wDL6DycfE",
    attendance: [
      { date: "2025-01-15", status: "present" },
      { date: "2025-01-16", status: "late" },
      { date: "2025-01-17", status: "present" },
      { date: "2025-01-18", status: "present" },
    ]
  }
];