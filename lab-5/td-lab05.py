import numpy as np
import math as m
import matplotlib.pyplot as plt


def demodulatorASK(z):
    dask = []
    for i in range(N):
        t = i * ts
        dask.append(z[i] * A * m.sin(2 * m.pi * fn * t))
    # plt.plot(dask)
    # plt.show()
    c = calka1(dask)
    return dask, c


def demodulatorPSK(z):
    dpsk = []
    for i in range(N):
        t = i * ts
        dpsk.append(z[i] * A * m.sin(2 * m.pi * fn * t))
    plt.plot(dpsk)
    plt.show()
    c=calka2(dpsk)
    return dpsk,c


def demodulatorFSK(z):
    dfsk1 = []
    dfsk2 = []
    for i in range(N):
        t = i * ts
        dfsk1.append(z[i] * Ar * m.sin(2 * m.pi * fn1 * t))
        dfsk2.append(z[i] * Ar * m.sin(2 * m.pi * fn2 * t))
    # plt.plot(dfsk1)
    # plt.plot(dfsk2)
    # plt.show()
    p1 = calka3(dfsk1)
    p2 = calka3(dfsk2)
    p = []
    c = []
    for i in range(N):
        razem = p2[i] - p1[i]
        p.append(razem)
        if p[i] > 0:
            c.append(1)
        else:
            c.append(0)
    # plt.plot(p)
    # plt.show()
    plt.plot(c)
    plt.show()
    return c


def ciag_bitow(tab,treshold):
    jedynki = 0
    zera = 0
    wynik = []
    TMP = 0
    for i in range(len(tab)):
        TMP = TMP + ts

        if TMP >= tb:

            if (jedynki / (jedynki + zera)) < treshold / 100:
                wynik.append(0)
            else:
                wynik.append(1)

            TMP = 0
            jedynki = 0
            zera = 0
        if tab[i] == 1:
            jedynki += 1
        else:
            zera += 1

    if (jedynki / (jedynki + zera)) > treshold / 100:
        wynik.append(1)
    else:
        wynik.append(0)
    return wynik


def calka1(x):
    p = []
    c = []
    s = 0
    licznik = 0
    h = 35 / 2
    for k in range(N):
        licznik += ts
        s += x[k]
        if licznik >= tb:
            s = 0
            licznik = 0
        p.append(s)

        if s > h:
            c.append(1)
        else:
            c.append(0)
    # plt.plot(p)
    # plt.show()
    # plt.plot(c)
    # plt.show()
    return c


def calka2(x):
    p = []
    c = []
    s = 0
    licznik = 0
    for k in range(N):
        licznik += ts
        s += x[k]
        if licznik >= tb:
            s = 0
            licznik = 0
        p.append(s)

        if s < 0:
            c.append(1)
        else:
            c.append(0)
    # plt.plot(p)
    # plt.show()
    # plt.plot(c)
    # plt.show()
    return c


def calka3(x):
    p = []
    c = []
    s = 0
    licznik = 0
    for k in range(N):
        licznik += ts
        s += x[k]
        if licznik >= tb:
            s = 0
            licznik = 0
        p.append(s)
    return p


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
    # plt.plot(za)
    # plt.show()
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
    # plt.plot(zf)
    # plt.show()
    return zf


def konwertuj(string):
    return ''.join(format(i, 'b') for i in bytearray(string, encoding='utf8'))

def test(c,res):
    zamien = ciag_bitow(c, B)
    string = "".join(str(elem) for elem in zamien)
    print(string)
    print(b)

    plt.plot(res, linewidth=3)
    plt.plot(c)
    plt.show()

napis = '''czupakabra'''
b = konwertuj(napis)

tc = 1  # czas trwania
B = len(b)
tb = tc / B  # czas trwania pojedynczego bitu
fs = 1600  # częstotliwość próbkowania
ts = 1 / fs  # okres próbkowania
N = tc * fs  # liczba próbek na cały sygnał
# N = m.ceil(tc / ts)

A = 1
Ar = 1
A1 = 1
A2 = 2
W = 2
fn = W * tb ** (-1)  # częstotliwość nośna
fn1 = (W + 1) / tb
fn2 = (W + 2) / tb

sygnal = sygnal(b)
res = [int(i) for i in sygnal]
apl = mod_apl(sygnal)
demask, c = demodulatorASK(apl)
test(c,res)
# print(res)
# print(c)

# plt.plot(c)
# plt.show()
# plt.plot(res)
# plt.show()
fazy = mod_fazy(sygnal)
dempsk,c = demodulatorPSK(fazy)
test(c,res)

cz = mod_cz(sygnal)
c = demodulatorFSK(cz)
test(c,res)
