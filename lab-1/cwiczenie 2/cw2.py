# ćwiczenie 2(numer 7)
tc = 10  # czas trwania
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
    x = (1 - t) * m.sin(2 * m.pi * f * t + fi) * m.cos(4 * m.pi * t)
    y = m.sin(m.pi * t) * m.sin(2 * x * m.pi * t)
    z = m.sqrt(abs(y)) - 3 * x
    v = x * m.pow(y, 2) - z * m.cos(x)
    przebieg.append(x)
    przebieg2.append(y)
    przebieg3.append(z)
    przebieg4.append(v)
    sekundy.append(t)


plt.plot(sekundy,przebieg2)
plt.show()
plt.plot(sekundy,przebieg3)
plt.show()
plt.plot(sekundy,przebieg4)
plt.show()