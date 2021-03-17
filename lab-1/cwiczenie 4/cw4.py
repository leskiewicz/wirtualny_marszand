# ćwiczenie 4(numer 10)
tc = 1  # czas trwania
f = 2000  # częstotliwość
fs = 22050  # częstotliwość próbkowania
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
fi = 100
przebieg1 = []
przebieg2 = []
przebieg3 = []
sekundy1 = []
sekundy2 = []
sekundy3 = []

H1 = 2
H2 = 4
H3 = 8

for n in range(N):
    t = n * ts
    h = 1
    for h in range(H1):
        if m.sin(h) == 0: continue
        b1 = m.sin(m.pi * t * (m.pow(h, 2) * m.sin(h))) / (7 * h)
        przebieg1.append(b1)
        sekundy1.append(t)
    for h in range(H2):
        if m.sin(h) == 0: continue
        b2 = m.sin(m.pi * t * (m.pow(h, 2) * m.sin(h))) / (7 * h)
        przebieg2.append(b2)
        sekundy2.append(t)
    for h in range(H3):
        if m.sin(h) == 0: continue
        b3 = m.sin(m.pi * t * (m.pow(h, 2) * m.sin(h))) / (7 * h)
        przebieg3.append(b3)
        sekundy3.append(t)


plt.plot(sekundy1,przebieg1)
plt.show()
plt.plot(sekundy2,przebieg2)
plt.show()
plt.plot(sekundy3,przebieg3)
plt.show()