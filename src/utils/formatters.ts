export function urlFormat(name: string): string {
  const accents = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
    é: "e",
    è: "e",
  };

  name = name
    .split("")
    .map((char) => accents[char as keyof typeof accents] || char)
    .join("");
  name = name.replace(/\s+/g, "-");
  name = name.toLowerCase();
  return name;
}
