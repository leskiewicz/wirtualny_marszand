import math as m
import matplotlib.pyplot as plt


def mod_apl(x, t, ka):
    za = []
    for i in range(N):
        za.append((ka * x[i] + 1) * (m.cos(2 * m.pi * fn * t[i])))
    plt.plot(czas, za)
    plt.show()


def mod_fazy(x, t, kp):
    zp = []
    for i in range(N):
        zp.append(m.cos(2 * m.pi * fn * t[i] + kp * x[i]))
    plt.plot(czas, zp)
    plt.show()


def mod_cz(x, t, kf):
    zf = []
    for i in range(N):
        zf.append(m.cos(2 * m.pi * fn * t[i] + (kf / fm) * x[i]))
    plt.plot(czas, zf)
    plt.show()


tc = 1  # czas trwania
fs = 8000  # częstotliwość próbkowania
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
fi = 100
fn = 100
fm = 5

przebieg = []
czas = []
for n in range(N):
    t = n / fs
    przebieg.append(m.sin(2 * m.pi * fm * t))
    czas.append(t)

mod_apl(przebieg, czas, 0.7)
mod_fazy(przebieg, czas, 0.5)
mod_cz(przebieg, czas, 0.2)

mod_apl(przebieg, czas, 9.9)
mod_fazy(przebieg, czas, 2.0)
mod_cz(przebieg, czas, 2.5)

mod_apl(przebieg, czas, 25.0)
mod_fazy(przebieg, czas, 3 * m.pi)
mod_cz(przebieg, czas, 4 * m.pi)