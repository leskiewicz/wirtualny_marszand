import math as m
import cmath as cm
import numpy as np
import matplotlib.pyplot as plt


def mod_apl(x, t, ka):
    za = []
    for i in range(N):
        za.append((ka * x[i] + 1) * (m.cos(2 * m.pi * fn * t[i])))
    plt.plot(czas, za)
    plt.show()
    return za


def mod_fazy(x, t, kp):
    zp = []
    for i in range(N):
        zp.append(m.cos(2 * m.pi * fn * t[i] + kp * x[i]))
    plt.plot(czas, zp)
    plt.show()
    return zp


def mod_cz(x, t, kf):
    zf = []
    for i in range(N):
        zf.append(m.cos(2 * m.pi * fn * t[i] + (kf / fm) * x[i]))
    plt.plot(czas, zf)
    plt.show()
    return zf


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
    # N = len(zesp)
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


tc = 1  # czas trwania
fs = 800  # częstotliwość próbkowania
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
# fi = 100
fn = 150  # częstotliwość nośna
fm = 5  # częstotliwość sygnału informacyjnego

przebieg = []
czas = []
for n in range(N):
    t = n / fs
    przebieg.append(m.sin(2 * m.pi * fm * t))
    czas.append(t)

ka = 0.7
kp = 0.5
kf = 0.2
apl = mod_apl(przebieg, czas, ka)
fazy = mod_fazy(przebieg, czas, kp)
cz = mod_cz(przebieg, czas, kf)

zesp = np.fft.fft(apl)
Z = moduly(zesp)
widmo(Z)
zesp = np.fft.fft(fazy)
Z = moduly(zesp)
widmo(Z)
zesp = np.fft.fft(cz)
Z = moduly(zesp)
widmo(Z)

ka = 9.9
kp = 3.0
kf = 2.5
apl = mod_apl(przebieg, czas, ka)
fazy = mod_fazy(przebieg, czas, kp)
cz = mod_cz(przebieg, czas, kf)

zesp = np.fft.fft(apl)
Z = moduly(zesp)
widmo(Z)
zesp = np.fft.fft(fazy)
Z = moduly(zesp)
widmo(Z)
zesp = np.fft.fft(cz)
Z = moduly(zesp)
widmo(Z)

ka = 25.0
kp = 3 * m.pi
kf = 4 * m.pi
apl = mod_apl(przebieg, czas, ka)
fazy = mod_fazy(przebieg, czas, kp)
cz = mod_cz(przebieg, czas, kf)

zesp = np.fft.fft(apl)
Z = moduly(zesp)
widmo(Z)
zesp = np.fft.fft(fazy)
Z = moduly(zesp)
widmo(Z)
zesp = np.fft.fft(cz)
Z = moduly(zesp)
widmo(Z)