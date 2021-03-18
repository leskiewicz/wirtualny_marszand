import math as m

# tc = 10  # czas trwania
# f = 2000  # częstotliwość
# fs = 8000  # częstotliwość próbkowania
# N = tc * fs  # liczba próbek na cały sygnał
# ts = 1 / fs  # okres próbkowania
# fi = 1
# przebieg = []
# sekundy = []
#
# for n in range(N):
#     t = n * ts
#     x = (1 - t) * m.sin(2 * m.pi * f * t + fi) * m.cos(4 * m.pi * t)
#     przebieg.append(x)
#     sekundy.append(t)

x=[1,2,3,4,5,6,7]
i = 1
szereg = 0
N = 7
i=m.sqrt(-1)
wyniki=[]

for k in range(N - 1):
    for n in range(N - 1):
        szereg = szereg + x[n] * m.pow(m.e, -i * ((2 * m.pi * k * n) / N))
    wyniki.append(szereg)
