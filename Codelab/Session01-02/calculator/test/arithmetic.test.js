describe('Arithmetic', function () {
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Unspecified operation"});
                    done();
                });
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operation: foobar"});
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: undefined"});
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: 4.2-1"});
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Invalid operand1: 4.2.1"});
                    done();
                });
        });
    });

    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -21});
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -42});
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -2.5});
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });
    });

    describe('Subtraction', function () {
        it('subtracts two positive integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=42&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 21});
                    done();
                });
        });
        it('subtracts zero from an integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('subtracts a positive integer from a negative integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=-21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -63});
                    done();
                });
        });
        it('subtracts two negative integers', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });
        it('subtracts a floating point number from an integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=5&operand2=2.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 2.5});
                    done();
                });
        });
        it('subtracts with negative exponent', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 2.4e-5});
                    done();
                });
        });
    });

    describe('Multiplication', function () {
        it('multiplies two positive integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=6&operand2=7')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('multiplies an integer by zero', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 0});
                    done();
                });
        });
        it('multiplies a positive integer by a negative integer', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -42});
                    done();
                });
        });
        it('multiplies two negative integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=-6&operand2=-7')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('multiplies an integer by a floating point number', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=2.5&operand2=4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 10});
                    done();
                });
        });
        it('multiplies with negative exponent', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=1.2e-5&operand2=1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 1.4400000000000002e-10});
                    done();
                });
        });
    });

    describe('Division', function () {
        it('divides two positive integers', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=7')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 6});
                    done();
                });
        });
        it('divides an integer by one', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 42});
                    done();
                });
        });
        it('divides a positive integer by a negative integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=-7')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: -6});
                    done();
                });
        });
        it('divides two negative integers', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-42&operand2=-7')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 6});
                    done();
                });
        });
        it('divides an integer by a floating point number', function (done) {
            request.get('/arithmetic?operation=divide&operand1=10&operand2=2.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 4});
                    done();
                });
        });
        it('divides with negative exponent', function (done) {
            request.get('/arithmetic?operation=divide&operand1=1.2e-5&operand2=1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({result: 1});
                    done();
                });
        });
        it('rejects division by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=0')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({error: "Division by zero"});
                    done();
                });
        });
    });

});
