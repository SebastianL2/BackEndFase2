Bellman-Ford (G,s)

Inicializar
    for cada v perteneciente a V[G]
        do d[v] = infinito
            p[v] = nulo
    p[s] = 0

for i=1 to V[G]-1 
    do for cada arco (u,v) perteneciente a A[G]
        Relajación
        if d[v] > d[u] + w(u,v) then 
            d[v] = d[u] + w(u,v)
            p(v) = u

for cada arco (u,v) chequea lazo de peso negativo
    do if d[v] > d[u] + w(u,v) then
        return FALSO 'el algoritmo no converge
return VERDADERO
