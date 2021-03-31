import math as m
import cmath as cm
import matplotlib.pyplot as plt
import numpy as np
import time


def dft(x):
    N = len(x)
    wyniki = []
    for k in range(N):
        szereg = complex(0)
        for n in range(N):
            szereg += x[n] * cm.exp(-2j * cm.pi * n * k / N)
        wyniki.append(szereg)
    return wyniki


def moduly(zesp):
    modul = []
    N = len(zesp) / 2
    for i in range(int(N)):
        z = m.sqrt(zesp[i].real ** 2 + zesp[i].imag ** 2)
        modul.append(z)
    # plt.plot(modul)
    # plt.show()
    return modul


def widmo(z):
    Mprim = []
    for k in range(len(z)):
        M = 10 * m.log10(z[k])
        Mprim.append(M)
    plt.plot(Mprim)
    plt.show()
    return Mprim

def czasy(x):
    start = time.perf_counter()
    dft(x)
    koniec = time.perf_counter()
    dft_time=koniec - start
    print('Czas dft wynosi', f"{dft_time:.10f}", 'sekund')
    # print('Czas wynosi',koniec-start,'sekund')

    start = time.perf_counter()
    np.fft.fft(x)
    koniec = time.perf_counter()
    fft_time=koniec - start
    print('Czas FFT wynosi', f"{fft_time:.10f}", 'sekund')
    # print('Czas wynosi',koniec-start,'sekund')
    print('Różnica w czasach wynosi', dft_time-fft_time,'sekund')


tc = 1  # czas trwania
f = 1000  # częstotliwość
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

zesp = dft(przebieg)
Z = moduly(zesp)
widmo(Z)
zesp = dft(przebieg2)
Z = moduly(zesp)
widmo(Z)
zesp = dft(przebieg3)
Z = moduly(zesp)
widmo(Z)
zesp = dft(przebieg4)
Z = moduly(zesp)
widmo(Z)
# czasy(przebieg)
# czasy(przebieg2)
# czasy(przebieg3)
# czasy(przebieg4)

przebieg = []
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

# czasy(przebieg)
zesp = dft(przebieg)
Z = moduly(zesp)
widmo(Z)

przebieg1 = []
przebieg2 = []
przebieg3 = []
sekundy = []
H1 = 2
H2 = 4
H3 = 8

fs = 22050
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
for n in range(N):
    t = n * ts
    h = 1
    b1 = 0
    b2 = 0
    b3 = 0
    for h in range(H1):
        if m.sin(h) == 0: continue
        b1 = b1 + m.sin(m.pi * t * (m.pow(h, 2) * m.sin(h))) / (7 * h)
    for h in range(H2):
        if m.sin(h) == 0: continue
        b2 = b2 + m.sin(m.pi * t * (m.pow(h, 2) * m.sin(h))) / (7 * h)
    for h in range(H3):
        if m.sin(h) == 0: continue
        b3 = b3 + m.sin(m.pi * t * (m.pow(h, 2) * m.sin(h))) / (7 * h)
    przebieg1.append(b1)
    przebieg2.append(b2)
    przebieg3.append(b3)
    sekundy.append(t)


# czasy(przebieg1)
# czasy(przebieg2)
# czasy(przebieg3)
zesp = dft(przebieg1)
Z = moduly(zesp)
widmo(Z)
zesp = dft(przebieg2)
Z = moduly(zesp)
widmo(Z)
zesp = dft(przebieg3)
Z = moduly(zesp)
widmo(Z)
