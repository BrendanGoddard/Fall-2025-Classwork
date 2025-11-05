using System;
using System.IO;
using System.Text;

namespace WordVectorAnalogies // Note: actual namespace depends on the project name.
{
    class Program
    {
        public static string[]? words;
        public static float[,]? vectors;
        public static string[] matches = new string[20];
        public static int wordCount = 0;
        public static int dimCount = 0;
        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("*****************************");
            Console.WriteLine("*   Word Vector Analogies   *");
            Console.WriteLine("*****************************");
            Console.ResetColor();
            Console.WriteLine();

            //string inputFile = @"c:\data\wiki-news-300d-1M.vec";
            string inputFile = @"c:\data\fasttext100k.txt";

            Console.WriteLine("Loading Dictionary....");
            DateTime start = DateTime.Now;

            Console.WriteLine(DateTime.Now);
            LoadWordVectorsReadAllLines(inputFile);

            Console.WriteLine(DateTime.Now);
            Console.WriteLine("Dictionary Loaded....");
            var elTime = (DateTime.Now - start).TotalSeconds;
            Console.WriteLine((int)elTime + " seconds");
            Console.WriteLine();

            // Examples:
            // man woman king
            // man woman prince
            // boy girl man
            // bad good sad
            // doctor hospital teacher
            // grass green sky
            // Rome Italy Athens
            // Canada Ottawa Australia

            Console.WriteLine("Analogies take the form: A is to B as C is to D");
            Console.Write("Example: ");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("man is to woman as king is to queen");
            Console.ResetColor();
            Console.WriteLine();
            Console.Write("Enter the previous example as a short form: ");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("man woman king");
            Console.ResetColor();
            Console.Write("The computer will return the full solution: ");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("man is to woman as king is to queen");
            Console.ResetColor();

            string analogy = "";

            do
            {
                Console.WriteLine();
                Console.Write("Enter 3 analogy word tokens: ");
                analogy = Console.ReadLine();

                string[] analogyArgs = analogy.Split(' ');

                if (analogy != "")
                {
                    if (analogyArgs.Length != 3)
                    {
                        Console.WriteLine("Must be 3 words, Please redo");
                    }
                    else
                    {
                        Console.WriteLine("Processing analogy...");
                        //Console.Write(analogyArgs[0] + " is to " + analogyArgs[1] + " as " + analogyArgs[2] + " is to ");

                        float[] vect1 = GetVect(analogyArgs[0]);
                        float[] vect2 = GetVect(analogyArgs[1]);
                        float[] vect3 = GetVect(analogyArgs[2]);

                        float[] vect4 = AddVect(vect2, vect1, -1);
                        float[] vect5 = AddVect(vect4, vect3, 1);

                        float[] vect6 = new float[dimCount];

                        for (int i = 0; i < matches.Length; i++)
                        {
                            matches[i] = "";
                        }

                        // the following nested for loops produce the
                        // greatest processing overhead because we're
                        // searching for the highest (at least top 20)
                        // cosine similarity for the million word set
                        // of word vectors

                        for (int i = 0; i < words.Length; i++)
                        {
                            for (int j = 0; j < dimCount; j++)
                            {
                                vect6[j] = vectors[i, j];
                            }
                            var cosSimilarity = CalculateCosineSimilarity(vect5, vect6);
                            MatchVect(i, cosSimilarity);
                        }

                        for (int i = 0; i < matches.Length; i++)
                        {
                            string[] argsM = matches[i].Split('_');
                            bool found = false;

                            for (int j = 0; j < analogyArgs.Length; j++)
                            {
                                if (analogyArgs[j] == argsM[1])
                                {
                                    found = true;
                                }
                            }

                            if (!found)
                            {
                                Console.Clear();
                                Console.Write(analogyArgs[0] + " is to " + analogyArgs[1] + " as " + analogyArgs[2] + " is to ");
                                Console.ForegroundColor = ConsoleColor.Red;
                                Console.WriteLine(argsM[1]);
                                Console.ResetColor();

                                Console.WriteLine();
                                Console.WriteLine("Word probability information (top similarities)");
                                Console.WriteLine();

                                Console.ForegroundColor = ConsoleColor.Red;

                                for (int x = 1; x < matches.Length; x++)
                                {
                                    Console.WriteLine(matches[x].Replace("_", " "));
                                }

                                Console.ResetColor();

                                break;
                            }
                        }
                    }
                }

            } while (analogy != "");
        }

        // *********************************************************
        // Load the word list and set of vectors from wiki300d1m.vec
        // Use File.ReadAllLines to load the data
        private static void LoadWordVectorsReadAllLines(string inputFile)
        {
            string[] lines = File.ReadAllLines(inputFile);
            string[] args = lines[0].Split(' ');

            wordCount = int.Parse(args[0]);
            dimCount = int.Parse(args[1]);

            words = new string[wordCount];
            vectors = new float[wordCount, dimCount];
            int count = 0;

            for (int i = 1; i < lines.Length - 2; i++)
            {
                args = lines[i].Split(' ');
                words[count] = args[0];

                for (int j = 0; j < dimCount; j++)
                {
                    vectors[count, j] = (float)Convert.ToDouble(args[j + 1]);
                }

                count++;
            }
            Console.WriteLine(count + " Lines");
        }

        // ************************************************************
        // retrieve the 300 element float array for the designated word
        private static float[] GetVect(string word)
        {
            float[] vec = new float[dimCount];

            for (int i = 0; i < wordCount; i++)
            {
                if (word == words[i])
                {
                    for (int j = 0; j < dimCount; j++)
                    {
                        vec[j] = vectors[i, j];
                    }
                }
            }

            return vec;
        }

        // *****************************************
        // add or subtract the 2 vectors based on op
        private static float[] AddVect(float[] vec1, float[] vec2, int op)
        {
            float[] vec = new float[dimCount];

            for (int j = 0; j < dimCount; j++)
            {
                if (op == 1)
                {
                    vec[j] = vec1[j] + vec2[j];
                }
                else
                {
                    vec[j] = vec1[j] - vec2[j];
                }
            }

            return vec;
        }

        // ***********************************************************************
        // adjust the "matches" string array based on the cosine similarity result
        private static void MatchVect(int x, double cosSim)
        {
            string sCosSim = cosSim.ToString();
            double dCosSim = 0.0;

            for (int i = 0; i < matches.Length; i++)
            {
                if (matches[i] != "")
                {
                    string[] args = matches[i].Split('_');
                    dCosSim = double.Parse(args[0]);
                }
                else
                {
                    dCosSim = 0.0;
                }

                if (cosSim > dCosSim)
                {
                    matches[matches.Length - 1] = sCosSim + "_" + words[x];
                    Array.Sort(matches);
                    Array.Reverse(matches);

                    break;
                }
            }
        }

        // *************************************************
        // calculate the cosine similarity for the 2 vectors
        // result will always be between 0.0 and 1.0
        private static double CalculateCosineSimilarity(float[] vecA, float[] vecB)
        {
            var dotProduct = DotProduct(vecA, vecB);
            var magnitudeOfA = Magnitude(vecA);
            var magnitudeOfB = Magnitude(vecB);

            return dotProduct / (magnitudeOfA * magnitudeOfB);
        }

        // **************************************************
        // calculate the dot product of vectors vecA and vecB
        // returns the double result
        private static double DotProduct(float[] vecA, float[] vecB)
        {
            float dotProduct = 0;
            for (var i = 0; i < vecA.Length; i++)
            {
                dotProduct += (vecA[i] * vecB[i]);
            }

            return dotProduct;
        }

        // *************************************
        // Calculate the magnitide of the vector
        // ... and return the value
        private static double Magnitude(float[] vector)
        {
            return Math.Sqrt(DotProduct(vector, vector));
        }
    }
}