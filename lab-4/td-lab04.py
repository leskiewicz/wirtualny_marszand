import numpy as np
import math as m
import matplotlib.pyplot as plt

def mod_apl(x, t, ka):
    za = []
    for i in range(N):
        za.append((ka * x[i] + 1) * (m.cos(2 * m.pi * fn * t[i])))
    # plt.plot(czas, za)
    # plt.show()
    return za


def konwertuj(string):
    tablica=[]
    for i in range(len(string)):
        print(i)
        tablica[i] = ord(string[i])
    return tablica


napis = 'abc'
print(napis[-1])
konwertowana=konwertuj(napis)
print(konwertowana)