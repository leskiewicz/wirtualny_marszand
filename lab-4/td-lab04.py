import numpy as np
import math as m
import matplotlib.pyplot as plt


def sygnal(string):
    n = 0
    sygnal = []
    TMP_TB = 0
    for k in range(N):
        TMP_TB = TMP_TB + ts
        if TMP_TB >= tb:
            n += 1
            TMP_TB = 0
        sygnal.append(string[n])
    return sygnal


def mod_apl(x):
    za = []
    for i in range(N):
        t = i * ts
        if x[i] == '0':
            za.append(A1 * (m.sin(2 * m.pi * fn * t)))
        elif x[i] == '1':
            za.append(A2 * (m.sin(2 * m.pi * fn * t)))
    plt.plot(za)
    plt.show()
    return za


def mod_fazy(x):
    zp = []
    for i in range(N):
        t = i * ts
        if x[i] == '0':
            zp.append(m.sin(2 * m.pi * fn * t))
        elif x[i] == '1':
            zp.append(m.sin(2 * m.pi * fn * t + m.pi))
    plt.plot(zp)
    plt.show()
    return zp


def mod_cz(x):
    zf = []
    for i in range(N):
        t = i * ts
        if x[i] == '0':
            zf.append(m.sin(2 * m.pi * fn1 * t))
        elif x[i] == '1':
            zf.append(m.sin(2 * m.pi * fn2 * t))
    plt.plot(zf)
    plt.show()
    return zf


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

def szerokosc_pasma(widmo, db):
    maksymalna = max(widmo)
    for i in range(len(widmo)):
        widmo[i] = widmo[i] - maksymalna
    for i in range(len(widmo)):
        if widmo[i] >= (-db):
            fmin = i
            break
    for i in range(len(widmo) - 1, 0, -1):
        if widmo[i] >= (-db):
            fmax = i
            break
    print('fmin:', fmin)
    print('fmax:', fmax)
    szerokosc = fmax - fmin
    print('Szerokosc dla %ddB: %d' % (db, szerokosc))
    # plt.plot(widmo)
    # plt.show()

def konwertuj(string):
    # return ''.join(format(ord(x), 'b') for x in string)
    return ''.join(format(i, 'b') for i in bytearray(string, encoding='utf8'))


napis = '''acdc'''
b = konwertuj(napis)
print(b)

A1 = 1
A2 = 2
W = 2

tc = 1  # czas trwania
B=len(b)
# B=7
tb = tc / B  # czas trwania pojedynczego bitu
fs = 1000  # częstotliwość próbkowania
ts = 1 / fs  # okres próbkowania
# N = tc*fs  # liczba próbek na cały sygnał
N = m.ceil(tc / ts)

fn = W * tb ** (-1)  # częstotliwość nośna
fn1 = (W + 1) / tb
fn2 = (W + 2) / tb

sygnal = sygnal(b)
# plt.plot(sygnal)
# plt.show()

print("=====ASK=====")
apl = mod_apl(sygnal)
zesp = np.fft.fft(apl)
Z = moduly(zesp)
w = widmo(Z)
szerokosc_pasma(w,3)
szerokosc_pasma(w,6)
szerokosc_pasma(w,12)

print("=====PSK=====")
fazy = mod_fazy(sygnal)
zesp = np.fft.fft(fazy)
Z = moduly(zesp)
w = widmo(Z)
szerokosc_pasma(w,3)
szerokosc_pasma(w,6)
szerokosc_pasma(w,12)

print("=====FSK=====")
cz = mod_cz(sygnal)
zesp = np.fft.fft(cz)
Z = moduly(zesp)
w = widmo(Z)
szerokosc_pasma(w,3)
szerokosc_pasma(w,6)
szerokosc_pasma(w,12)
