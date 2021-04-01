import math as m
import matplotlib.pyplot as plt

def aplitudowo(x,t):
    przebieg2=[]
    for a in range(N):
        ka=0.5
        zA=(ka*x[a]+1)*m.cos(2*m.pi*fn*t)
        przebieg2.append(zA)
    return przebieg2

# def mod_fazy(x,t):
#     przebieg3=[]
#     for a in range(len(x)):
#         kp=2
#         zP=m.cos(2*m.pi*fs*t+kp*x[a])
#         przebieg3.append(zP)
#     return przebieg3
#
# def mod_cz(x,t):
#     przebieg4=[]
#     for a in range(len(x)):
#         kf=2
#         zF=
#         przebieg4.append(zF)
#     return przebieg4


tc = 1  # czas trwania
fs = 8000  # częstotliwość próbkowania
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
fi = 100

fn=100
fm=5

przebieg = []
sekundy = []
for n in range(N):
    t = n/fs
    x = m.sin(2 * m.pi * fn * t)
    przebieg.append(x)
    sekundy.append(t)
plt.plot(sekundy,przebieg)
plt.show()

ampl=aplitudowo(przebieg,sekundy)
plt.plot(sekundy,ampl)
plt.show()