# ćwiczenie 3(numer 11)
tc = 1  # czas trwania
f = 2000  # częstotliwość
fs = 8000  # częstotliwość próbkowania
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
fi = 100
przebieg = []
przebieg2 = []
przebieg3 = []
przebieg4 = []
sekundy = []

for n in range(N):
    t = n * ts
    if 0 <= t < 0.22:
        u = (1 - 7 * t) * m.sin(2 * m.pi * t * 10 / (t + 0.04))
    elif 0.22 <= t < 0.57:
        u = 0.63 * t * m.sin(125 * t) + m.log2(2 * t)
    elif 0.57 <= t < 0.97:
        u = pow(t, -0.0662) + 0.77 * m.sin(8 * t)

    przebieg.append(u)
    sekundy.append(t)

plt.plot(sekundy, przebieg)
plt.show()