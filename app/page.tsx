'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { Loader } from '../components/Loader';
import { Instructions } from '../components/Instructions';
import { Post } from '../types';
import { useFilteredPosts } from '../hooks/useFilteredPosts';

export interface FormData {
  input: string;
}

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [textValue, setTextValue] = useState<string>('init');
  const [customColorName, setCustomColorName] = useState<string>('blue');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckboxChange = (newValue: boolean) => {
    setCheckboxValue(newValue);
  };

  const handleSetGreen = () => {
    setCustomColorName('green');
  };

  const onSubmit = (data: FormData) => {
    console.log('Data was sent successfully', data);
    alert('Data was sent successfully');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { filteredPosts, handleSearch, searchTerm } = useFilteredPosts(posts); // Passing data from API to useFilteredPosts hook

  return (
    <div className="p-2">
      <div className="flex flex-col gap-2 my-2 ml-1">
        <div>
          <p className={`${customColorName === 'green' ? 'bg-green-400' : 'bg-blue-400'}`}>
            customColorName = "{customColorName}"
          </p>
        </div>
        <div>
          <p className="bg-pink-400">textValue = "{textValue}" </p>
        </div>
        <div>
          <p className="bg-purple-400">checkboxValue = "{checkboxValue.toString()}" </p>
        </div>
      </div>
      <div className="flex gap-3 my-3 items-center justify-center">
        {/* This button change theme to green*/}
        <button onClick={handleSetGreen} className="bg-slate-300 rounded-md p-1.5">
          <span className="bg-green-300"> set theme to green</span>
        </button>
        {/* This button change theme to blue*/}
        <button onClick={() => setCustomColorName('blue')} className="bg-slate-300 rounded-md p-1.5">
          <span className="bg-blue-300"> set theme to blue</span>
        </button>

        <button onClick={() => setTextValue('new value')} className="bg-slate-300 rounded-md p-1.5">
          set input value
        </button>
        {/* This button should toggle checkbox state */}
        <button onClick={() => setCheckboxValue(!checkboxValue)} className="bg-slate-300 rounded-md p-1.5">
          <span className="bg-yellow-300">Toggle Checkbox</span>
        </button>
      </div>

      <div className="flex flex-col gap-5 m-8 justify-center">
        <form
          className="flex flex-col gap-5 m-8 justify-center border border-grey p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Validation Input field */}
          <Input
            value={textValue}
            onChange={setTextValue}
            color={customColorName}
            name="Input"
            register={register}
            errors={errors}
            validationSchema={{
              required: true,
              minLength: 4,
              maxLength: 8,
              pattern: /^[A-Za-z]+$/i,
            }}
          />

          {/* Validation checkbox field */}
          <Checkbox
            checked={checkboxValue}
            onChange={handleCheckboxChange}
            color={customColorName}
            name="Checkbox"
            register={register}
            errors={errors}
            validationSchema={{
              required: true,
            }}
          >
            Test
          </Checkbox>

          {/* Form Submit Button */}
          <div className=" gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              aria-label="Submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="font-bold text-center text-xl ">Results:</div>

        {/* Search Input */}
        <div className="my-3">
          <input
            type="text"
            placeholder="Search by title..."
            onChange={(event) => handleSearch(event.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            data-testid="search-input"
          />
        </div>

        {/* Loader and Posts */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {filteredPosts.map((post: Post) => (
              <div key={post.id} className="bg-white shadow-md p-4 rounded-md mb-4">
                <h2 className="text-lg font-semibold mb-2">
                  {post.title && searchTerm
                    ? post.title.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, index) => (
                        <span
                          key={index}
                          className={part.toLowerCase() === searchTerm.toLowerCase() ? 'bg-yellow-300' : ''}
                        >
                          {part}
                        </span>
                      ))
                    : post.title}
                </h2>
                <p className="text-sm">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Instructions />
    </div>
  );
}
