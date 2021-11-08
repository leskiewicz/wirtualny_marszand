# ćwiczenie 1(numer 8)
tc = 10  # czas trwania
f = 2000  # częstotliwość
fs = 8000  # częstotliwość próbkowania
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
fi = 1
przebieg = []
sekundy = []

for n in range(N):
    t = n * ts
    x = (1 - t) * m.sin(2 * m.pi * f * t + fi) * m.cos(4 * m.pi * t)
    przebieg.append(x)
    sekundy.append(t)

plt.plot(sekundy, przebieg)
plt.show()